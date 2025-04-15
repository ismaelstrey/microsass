import { motion } from "framer-motion";
import Link from "next/link";

export default function Menu() {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center justify-center h-screen w-96 bg-blue-400">
  
        <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/usuarios">Usuarios</Link>
        <Link href="/pagamento">Pagamentos</Link>
      </div>
    </motion.div>
  
  );
}