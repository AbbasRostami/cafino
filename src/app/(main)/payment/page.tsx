import {
  PaymentStatusWrapper,
  PaymentBackground,
} from "@/components/main/payment";

export default function PaymentPage() {
  return (
    <div className="min-h-screen pt-28 py-4 px-4 relative">
      <PaymentBackground />

      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-800/50">
          <PaymentStatusWrapper />
        </div>
      </div>
    </div>
  );
}
