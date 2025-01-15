"use client";

import { giveReview } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import StarRating from "./star-rating";

export default function TakeReview({
  userId,
  hotelId,
}: {
  userId: string;
  hotelId: string;
}) {
  const [content, setContent] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    if (!userId) {
      return router.push("/login");
    }
    console.log("rating", rating);

    if (!rating) {
      return toast.error("Please select a rating");
    }
    if (!content) {
      return toast.error("Please write a review");
    }

    const data = {
      content,
      rating,
      user: userId,
      hotel: hotelId,
    };
    const response = await giveReview(data);
    if (response?.status === "success") {
      setRating(0);
      setContent("");
      toast.success(response.message);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="bg-[#ff6a28] hover:bg-[#ff6a28]/90">
          Write a Review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Share Your Experience</DialogTitle>
        </DialogHeader>
        <DialogDescription />
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-center gap-1">
            <StarRating setCurrentRating={setRating} />
          </div>
          <Textarea
            placeholder="Tell us about your stay..."
            className="min-h-[150px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button
            className="bg-[#ff6a28] hover:bg-[#ff6a28]/90"
            onClick={handleSubmit}
          >
            Submit Review
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
