import RecommendationForm from "@/components/ui/RecommendationForm";

export default function LeaveRecommendationPage() {
  return (
    <div className="space-y-4 animate-fade-in max-w-xl mb-auto">
      <div className="flex flex-col pb-2 gap-2">
        <h1 className="text-xl sm:text-2xl font-bold">
          Write a Recommendation
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          Thank you for sharing your experience working with me. Your feedback
          means a lot!
        </p>
      </div>
      <RecommendationForm />
    </div>
  );
}
