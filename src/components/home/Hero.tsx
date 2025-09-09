import { Button } from "../ui/Button"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-6xl font-black mb-6 leading-tight">
            Explore Ocean Data
            <span className="text-secondary"> Like Never Before</span>
          </h1>
          
          <p className="text-xl text-white/80 mb-8">
            Advanced visualization and analysis tools for oceanographic data,
            powered by cutting-edge technology.
          </p>
          
          <div className="flex gap-4">
            <Button size="lg">
              Get Started
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Floating elements */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="relative w-[500px] h-[500px]">
          {/* Add floating data visualizations here */}
        </div>
      </div>
    </section>
  )
}