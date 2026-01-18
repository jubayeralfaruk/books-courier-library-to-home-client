import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import UseAxiosSecure from "../../hooks/useAxiosSecure";
import AOS from "aos";
import "aos/dist/aos.css";
import HistoryIcon from "@mui/icons-material/History";

// Skeleton Loader Component
const SkeletonCard = () => {
  return (
    <div className="animate-pulse bg-surface shadow-lg rounded-xl p-5 border border-theme">
      <div className="h-5 w-1/3 bg-theme-secondary rounded mb-4"></div>
      <div className="h-4 w-2/3 bg-theme-secondary rounded mb-3"></div>
      <div className="h-4 w-1/2 bg-theme-secondary rounded mb-3"></div>
      <div className="h-4 w-1/4 bg-theme-secondary rounded"></div>
    </div>
  );
};

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const { data: orderHistory = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="p-6 bg-theme-primary min-h-screen">
      {/* Page Title */}
      <div
        className="flex items-center gap-3 mb-6"
        data-aos="fade-down">
        <HistoryIcon
          style={{ fontSize: 40, color: 'var(--color-primary)' }}
        />
        <h2 className="text-3xl font-bold text-theme-primary">Payment History</h2>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {/* When empty */}
      {!isLoading && orderHistory.length === 0 && (
        <p
          className="text-center text-theme-secondary text-lg mt-10"
          data-aos="zoom-in">
          No payment history found.
        </p>
      )}

      {/* Payment Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {orderHistory.map((payment) => (
          <div
            key={payment._id}
            className="bg-surface p-5 shadow-lg rounded-xl border border-theme hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
            data-aos="fade-up">
            <h3 className="text-xl font-semibold text-theme-primary mb-2">
              {payment.bookTitle}
            </h3>

            <p className="text-theme-secondary text-sm mb-2">
              <strong>Amount:</strong> {payment.amount} BDT
            </p>

            <p className="text-theme-secondary text-sm mb-2">
              <strong>Transaction ID:</strong> <br />
              <span className="text-theme-primary font-mono">{payment.transactionId}</span>
            </p>

            <p className="text-theme-secondary text-sm mb-2">
              <strong>Status:</strong>{" "}
              <span className="font-semibold" style={{ color: 'var(--color-success)' }}>
                {payment.paymentStatus}
              </span>
            </p>

            <p className="text-theme-secondary text-sm">
              <strong>Date:</strong>{" "}
              {new Date(payment.paymentDate).toLocaleString()}
            </p>

            <p className="text-theme-secondary text-sm mt-2">
              <strong>Tracking ID:</strong>{" "}
              <span className="font-mono" style={{ color: 'var(--color-primary)' }}>
                {payment.trackingId}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;
