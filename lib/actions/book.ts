"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { eq, and } from "drizzle-orm";
import dayjs from "dayjs";

export const borrowBook = async (params: BorrowBookParams) => {
  const { userId, bookId } = params;

  try {
    // Check if the user has already borrowed this book
    const existingBorrow = await db
      .select({ id: borrowRecords.id })
      .from(borrowRecords)
      .where(
        and(
          eq(borrowRecords.userId, userId),
          eq(borrowRecords.bookId, bookId),
          eq(borrowRecords.borrowStatus, "BORROWED")
        )
      )
      .limit(1);

    if (existingBorrow.length > 0) {
      return {
        success: false,
        error: "You have already borrowed this book.",
      };
    }

    // Check book availability
    const book = await db
      .select({ availableCopies: books.availableCopies })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    if (!book.length || book[0].availableCopies <= 0) {
      return {
        success: false,
        error: "Book is not available for borrowing.",
      };
    }

    // Use a transaction to ensure data consistency
    const dueDate = dayjs().add(7, "day").toDate().toDateString();

    // Insert borrow record
    const insertedRecords = await db
      .insert(borrowRecords)
      .values({
        userId,
        bookId,
        dueDate,
        borrowStatus: "BORROWED",
      })
      .returning({
        id: borrowRecords.id, // JEPROX: I've added a returning id after inserting the record
      });

    // Update book availability
    await db
      .update(books)
      .set({ availableCopies: book[0].availableCopies - 1 })
      .where(eq(books.id, bookId));

    return {
      success: true,
      // data: JSON.parse(JSON.stringify(record)), // JEPROX: No need to use JSON parse due to not returning an object data
      data: insertedRecords[0],
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: "An error occured while borrowing the book.",
    };
  }
};
