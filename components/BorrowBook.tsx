"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { borrowBook } from "@/lib/actions/book";
import { Loader2 } from "lucide-react";

interface Props {
  userId: string;
  bookId: string;
  borrowingEligibility: {
    isEligible: boolean;
    message: string;
  };
}

const BorrowBook = ({
  userId,
  bookId,
  borrowingEligibility: { isEligible, message },
}: Props) => {
  const router = useRouter();
  const [borrowing, setBorrowing] = useState(false);
  const isProcessingRef = useRef(false); // Track if a request is in progress

  // FIX: Need to figure out how to prevent a double entry insert after clicking the button
  const handleBorrowBook = async () => {
    // Check if already processing or not eligible
    if (isProcessingRef.current || borrowing) {
      return; // Prevent multiple clicks
    }

    if (!isEligible) {
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      return; // Add this return to prevent proceeding when not eligible
    }

    setBorrowing(true);
    isProcessingRef.current = true;

    try {
      const result = await borrowBook({ bookId, userId });
      if (result.success) {
        toast({
          title: "Success",
          description: "Book borrowed successfully.",
        });
        router.push("/");
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while borrowing the book.",
        variant: "destructive",
      });
    } finally {
      setBorrowing(false);
      // Add a small delay before allowing new submissions
      setTimeout(() => {
        isProcessingRef.current = false;
      }, 1000);
    }
  };

  return (
    <>
      <Button
        className="book-overview_btn"
        onClick={handleBorrowBook}
        disabled={borrowing}
      >
        <Image src="/icons/book.svg" alt="book" width={20} height={20} />
        <p className="font-bebas-neue text-xl text-dark-100">
          {borrowing ? (
            <span className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Borrowing ...</span>
            </span>
          ) : (
            "Borrow Book"
          )}
        </p>
      </Button>
    </>
  );
};

export default BorrowBook;
