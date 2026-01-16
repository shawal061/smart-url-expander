import { motion } from "framer-motion";

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ marginTop: 20, textAlign: "center", color: "#6366f1" }}
    >
      🔍 Expanding link…
    </motion.div>
  );
}
