import { getUserByEmail } from "@/app/db/queries/user/user.query";
import { PaymentForm } from "@/components/payment/payment-form";
import { PaymentSummary } from "@/components/payment/payment-summary";

import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { SessionType } from "@/lib/types";
import { redirect } from "next/navigation";

export default async function PaymentPage({ searchParams, params }) {
  const session = (await auth()) as unknown as SessionType;

  const { id } = await params;

  const user = await getUserByEmail(session?.user?.email);

  if (!session) {
    return redirect("/login");
  }

  const bookingDetails = {
    hotelName: "Effotel By Sayaji Jaipur",
    location: "Kolkata",
    checkIn: "2024-01-15",
    checkOut: "2024-01-17",
    rooms: 1,
    guests: 2,
    pricePerNight: 124,
    numberOfNights: 2,
    taxes: 49.6,
    serviceFee: 24.8,
  };

  return (
    <div className="container mx-auto px-4 py-8 max-width">
      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2 dark:bg-sky-900/50 dark:border-sky-800">
          <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6 dark:text-sky-100">
              Complete your booking
            </h1>
            <PaymentForm
              searchParams={await searchParams}
              email={session?.user?.email}
              name={session?.user?.name}
              hotelId={id}
              userId={user?._id}
            />
          </div>
        </Card>
        <div className="lg:pl-4">
          <PaymentSummary booking={bookingDetails} />
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-sky-300">
              <LockIcon className="h-4 w-4" />
              Secure payments handled by Stripe
            </div>
            <div className="grid grid-cols-3 gap-4">
              <img
                src="/placeholder.svg?height=30&width=50"
                alt="Visa"
                className="h-8 object-contain dark:opacity-70"
              />
              <img
                src="/placeholder.svg?height=30&width=50"
                alt="Mastercard"
                className="h-8 object-contain dark:opacity-70"
              />
              <img
                src="/placeholder.svg?height=30&width=50"
                alt="American Express"
                className="h-8 object-contain dark:opacity-70"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
