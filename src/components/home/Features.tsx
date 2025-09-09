import { FloatingCard } from "../ui/FloatingCard"
import { motion } from "framer-motion"

const features = [
  {
    title: "Real-time Data",
    description: "Access live oceanographic data from sensors worldwide",
    icon: "📊"
  },
  {
    title: "Advanced Analytics",
    description: "Powerful tools for data analysis and visualization",
    icon: "🔍"
  },
  {
    title: "Collaboration",
    description: "Share insights and work together with your team",
    icon: "🤝"
  }
]

export function Features() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <FloatingCard className="h-full">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </FloatingCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}