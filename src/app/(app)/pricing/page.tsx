import { Pricing } from "@/components/blocks/pricing";

const demoPlans = [
  {
    name: "FREE",
    price: "0",
    yearlyPrice: "0",
    period: "forever",
    features: [
      "3 portfolio projects",
      "5 pre-built templates",
      "Basic AI employability score",
    ],
    description:
      "Perfect for students and new developers starting their journey",
    buttonText: "Get Started Free",
    isPopular: false,
  },
  {
    name: "PRO MONTHLY",
    price: "299",
    yearlyPrice: "249", // 17% discount for annual
    period: "per month",
    features: [
      "Unlimited projects",
      "20+ premium templates",
      "Advanced AI employability analysis",
      "Custom domain support",
    ],
    description:
      "Ideal for professional developers seeking better opportunities",
    buttonText: "Start Pro Trial",
    isPopular: true,
  },
  {
    name: "PRO YEARLY",
    price: "2999",
    yearlyPrice: "2499", // Same as monthly calculation: 249*12 = 2988, rounded to 2499 for better pricing
    period: "per year",
    features: [
      "Everything in Pro Monthly",
      "AI-powered job matching alerts",
      "Portfolio A/B testing",
      "Advanced SEO optimization",
    ],
    description: "Best value for serious developers committed to career growth",
    buttonText: "Save with Yearly",
    isPopular: false,
  },
];

const PricingPage = () => {
  return (
    <div className=" h-[500px] rounded-lg sm:ml-16 sm:-mt-16">
      <Pricing
        plans={demoPlans}
        title="Simple, Transparent Pricing"
        description="Choose the plan that works for you.All plans include access to our platform, lead generation tools, and dedicated support."
      />
    </div>
  );
};

export default PricingPage;
