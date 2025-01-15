import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function ReviewCard({
  review,
}: {
  review: {
    id: number;
    author: string;
    rating: number;
    date: string;
    content: string;
    helpful: number;
    avatar: string;
  };
}) {
  return (
    <Card className="dark:bg-[#54f3db1a] backdrop-blur-lg bg-gray-50/10 border-zinc-100 dark:border-none">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-4">
            <Avatar>
              <AvatarImage src={review.avatar} alt={review.author} />
              <AvatarFallback>{review.author[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{review.author}</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {review.date}
                </span>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-4 dark:text-white">{review.content}</p>
      </CardContent>
    </Card>
  );
}
