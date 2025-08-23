'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  DocumentTextIcon,
  UsersIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  BoltIcon,
  ClockIcon,
  StarIcon,
  PlayIcon,
  DocumentCheckIcon,
  PresentationChartLineIcon,
  CogIcon,
  BuildingOfficeIcon,
  CloudIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import Navbar from '@/components/pure/navbar/NavBar';

// Navbar Component
/* const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
              <DocumentTextIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">InvoLuck</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">Funciones</a>
            <a href="#pricing" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">Precios</a>
            <a href="#testimonials" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">Testimonios</a>
            <a href="#contact" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">Contacto</a>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-purple-600 font-medium hover:text-purple-700 transition-colors">
              Iniciar Sesión
            </button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Comenzar Gratis
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}; */

const features = [
  {
    icon: DocumentTextIcon,
    title: "Facturación Inteligente",
    description: "Crea facturas profesionales en menos de 2 minutos con cálculo automático de totales, IVA y exportación a PDF de alta calidad.",
    benefits: ["Plantillas personalizables", "Cálculos automáticos", "Exportación instantánea"]
  },
  {
    icon: UsersIcon,
    title: "Gestión de Clientes",
    description: "CRM integrado para gestionar toda la información de tus clientes, historial de pagos y comunicación centralizada.",
    benefits: ["Base de datos centralizada", "Historial completo", "Comunicación automática"]
  },
  {
    icon: ChartBarIcon,
    title: "Dashboard Intuitivo",
    description: "Análisis financiero en tiempo real con métricas clave, gráficos interactivos y reportes personalizados.",
    benefits: ["Métricas en tiempo real", "Reportes automáticos", "Análisis predictivo"]
  },
  {
    icon: ShieldCheckIcon,
    title: "Seguridad Empresarial",
    description: "Protección de datos nivel bancario con encriptación SSL, respaldos automáticos y cumplimiento GDPR.",
    benefits: ["Encriptación SSL 256-bit", "Backups automáticos", "Cumplimiento normativo"]
  },
  {
    icon: GlobeAltIcon,
    title: "Multi-localización",
    description: "Soporte para múltiples países, monedas e idiomas. Cumplimiento fiscal internacional automático.",
    benefits: ["50+ monedas", "Múltiples idiomas", "Cumplimiento fiscal"]
  },
  {
    icon: BoltIcon,
    title: "Automatización Avanzada",
    description: "Flujos de trabajo inteligentes, recordatorios automáticos y integración con tu stack tecnológico existente.",
    benefits: ["Workflows personalizados", "Notificaciones inteligentes", "Integraciones API"]
  }
];

const stats = [
  { label: "Facturas Procesadas", value: "2.5M+", icon: DocumentTextIcon, color: "text-blue-600" },
  { label: "Empresas Activas", value: "15,000+", icon: BuildingOfficeIcon, color: "text-green-600" },
  { label: "Países Soportados", value: "120+", icon: GlobeAltIcon, color: "text-purple-600" },
  { label: "Tiempo Ahorrado", value: "85%", icon: ClockIcon, color: "text-orange-600" },
  { label: "Precisión Fiscal", value: "99.9%", icon: CheckCircleIcon, color: "text-emerald-600" },
  { label: "Uptime SLA", value: "99.99%", icon: CloudIcon, color: "text-indigo-600" }
];

const testimonials = [
  {
    name: "María García",
    role: "CEO, Design Studio",
    company: "Freelancer",
    content: "InvoLuck transformó completamente mi proceso de facturación. Lo que antes me tomaba horas, ahora lo hago en minutos.",
    avatar: "MG",
    rating: 5
  },
  {
    name: "Carlos Mendoza",
    role: "CFO, TechCorp",
    company: "Mediana Empresa",
    content: "La automatización y los reportes nos han ayudado a optimizar nuestro flujo de caja y reducir errores en un 90%.",
    avatar: "CM",
    rating: 5
  },
  {
    name: "Ana López",
    role: "Controller, GlobalTrade",
    company: "Gran Empresa",
    content: "El soporte multi-moneda y cumplimiento internacional nos permitió expandirnos a 12 países sin complicaciones.",
    avatar: "AL",
    rating: 5
  }
];

const integrations = [
  { name: "Stripe", logo: "💳" },
  { name: "PayPal", logo: "💰" },
  { name: "QuickBooks", logo: "📊" },
  { name: "Xero", logo: "📈" },
  { name: "Salesforce", logo: "☁️" },
  { name: "Slack", logo: "💬" },
  { name: "Zapier", logo: "⚡" },
  { name: "HubSpot", logo: "🎯" }
];

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "mes",
    description: "Perfecto para freelancers y pequeños negocios",
    popular: false,
    features: [
      "Hasta 100 facturas/mes",
      "Gestión básica de clientes",
      "Exportación PDF profesional",
      "Dashboard básico",
      "Soporte por email",
      "1 usuario incluido",
      "Plantillas básicas",
      "Reportes estándar"
    ],
    cta: "Comenzar gratis"
  },
  {
    name: "Professional",
    price: "$99",
    period: "mes",
    description: "Ideal para medianas empresas en crecimiento",
    popular: true,
    features: [
      "Hasta 1,000 facturas/mes",
      "Multiusuario (hasta 5 usuarios)",
      "Gestión avanzada de clientes",
      "Reportes detallados y analytics",
      "Soporte prioritario",
      "Integraciones básicas",
      "Automatización de workflows",
      "Custom branding básico",
      "API de terceros",
      "Facturación recurrente"
    ],
    cta: "Prueba gratuita 14 días"
  },
  {
    name: "Business",
    price: "$299",
    period: "mes",
    description: "Para empresas con necesidades avanzadas",
    popular: false,
    features: [
      "Facturas ilimitadas",
      "Usuarios ilimitados",
      "Multi-localización completa",
      "Integraciones avanzadas",
      "Custom branding completo",
      "Soporte 24/7 dedicado",
      "API completa",
      "Manager de cuenta",
      "Cumplimiento fiscal automático",
      "White-label disponible",
      "SLA garantizado",
      "Consultoría incluida"
    ],
    cta: "Contactar ventas"
  }
];

const processSteps = [
  {
    step: "01",
    title: "Registro Rápido",
    description: "Crea tu cuenta en menos de 2 minutos. Sin tarjeta de crédito requerida.",
    icon: UserIcon
  },
  {
    step: "02",
    title: "Configura tu Empresa",
    description: "Importa tus datos o completa tu perfil empresarial con nuestro asistente inteligente.",
    icon: CogIcon
  },
  {
    step: "03",
    title: "Crea tu Primera Factura",
    description: "Usa nuestras plantillas profesionales o diseña la tuya. Envío automático por email.",
    icon: DocumentCheckIcon
  },
  {
    step: "04",
    title: "Analiza y Optimiza",
    description: "Visualiza tus métricas, automatiza procesos y escala tu negocio con insights inteligentes.",
    icon: PresentationChartLineIcon
  }
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header>
        <Navbar />
      </header>

      <main className="flex-grow">
        <section className="pt-24 pb-20 px-4 bg-gradient-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a855f7' fill-opacity='0.03'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge superior */}
              <motion.div
                className="inline-flex items-center space-x-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <StarIcon className="w-4 h-4" />
                <span>Líder en facturación digital • +15,000 empresas confían en nosotros</span>
              </motion.div>

              {/* Título principal */}
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <span className="bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-900 bg-clip-text text-transparent">
                  Facturación
                </span>
                <br />
                <span className="text-gray-900">que Impulsa tu Negocio</span>
              </motion.h1>

              {/* Subtítulo */}
              <motion.p
                className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                La plataforma de facturación más completa para{' '}
                <strong className="text-purple-700">freelancers</strong>,{' '}
                <strong className="text-purple-700">PyMEs</strong> y{' '}
                <strong className="text-purple-700">empresas</strong>.
                <br className="hidden sm:block" />
                Automatiza tu proceso, cumple normativas internacionales y escala sin límites.
              </motion.p>

              {/* Botones */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <motion.button
                  className="group flex items-center justify-center space-x-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 font-semibold text-lg sm:text-xl shadow-xl hover:shadow-2xl w-full sm:w-auto"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Comenzar Gratis</span>
                  <ArrowRightIcon className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  className="group flex items-center justify-center space-x-3 text-purple-700 px-8 sm:px-10 py-4 sm:py-5 rounded-xl hover:bg-purple-50 transition-all duration-300 font-semibold text-lg sm:text-xl border-2 border-purple-200 hover:border-purple-300 w-full sm:w-auto"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <PlayIcon className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
                  <span>Ver Demo Interactiva</span>
                </motion.button>
              </motion.div>

            </motion.div>

            {/* Stats */}
            <motion.div
              className="mt-16 sm:mt-24 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    className="text-center group cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex justify-center mb-3 sm:mb-4">
                      <div className="p-2 sm:p-3 bg-white rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300">
                        <IconComponent className={`w-6 h-6 sm:w-8 sm:h-8 ${stat.color}`} />
                      </div>
                    </div>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-1 sm:mb-2">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium px-1">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>


        {/* Features Section Enhanced */}
        <section id="features" className="py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold mb-6 text-gray-900">
                Funcionalidades que Marcan la Diferencia
              </h2>
              <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Herramientas profesionales diseñadas para optimizar cada aspecto de tu proceso de facturación y crecimiento empresarial.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-10">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-purple-200 group"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl mb-6 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-purple-700 transition-colors">
                      {feature.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                      {feature.description}
                    </p>

                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                          <CheckCircleIcon className="w-4 h-4 text-purple-500 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 px-4 bg-gradient-to-br from-purple-50 to-blue-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold mb-6 text-gray-900">
                Comienza en 4 Pasos Simples
              </h2>
              <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
                De cero a facturación profesional en menos de 10 minutos
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <motion.div
                    key={step.step}
                    className="text-center group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="relative mb-8">
                      <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto group-hover:scale-110 transition-transform border-4 border-purple-100">
                        <IconComponent className="w-8 h-8 text-purple-600" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {step.step}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-4 text-gray-900">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold mb-6 text-gray-900">
                Lo que Dicen Nuestros Clientes
              </h2>
              <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
                Miles de empresas ya confían en InvoLuck para su facturación
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                      <div className="text-xs text-purple-600 font-medium">{testimonial.company}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Integrations Section */}
        <section className="py-24 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                Se Integra con tus Herramientas Favoritas
              </h2>
              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                Conecta InvoLuck con más de 1000 aplicaciones para optimizar tu flujo de trabajo
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-4 md:grid-cols-8 gap-8 items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {integrations.map((integration, index) => (
                <motion.div
                  key={integration.name}
                  className="text-center group cursor-pointer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center text-2xl mb-3 group-hover:shadow-lg transition-shadow mx-auto">
                    {integration.logo}
                  </div>
                  <p className="text-sm text-gray-600 font-medium">{integration.name}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Enhanced Pricing Section */}
        <section id="pricing" className="py-24 px-4 bg-gradient-to-br from-gray-50 to-purple-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold mb-6 text-gray-900">
                Precios Transparentes para Cada Etapa
              </h2>
              <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
                Comienza gratis y escala cuando lo necesites. Sin sorpresas, sin compromisos largos.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-10">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  className={`bg-white rounded-3xl p-10 relative border-2 transition-all duration-500 hover:shadow-2xl ${plan.popular
                    ? 'border-purple-500 shadow-xl transform scale-105'
                    : 'border-gray-200 hover:border-purple-300'
                    }`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: plan.popular ? 0 : -8 }}
                >
                  {plan.popular && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                        ⭐ Más Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-10">
                    <h3 className="text-3xl font-bold text-gray-900 mb-3">{plan.name}</h3>
                    <p className="text-gray-600 mb-6 text-lg">{plan.description}</p>
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="text-6xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600 ml-2 text-xl">
                        {plan.currency}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {plan.description2}
                    </p>
                  </div>

                  <ul className="list-disc list-inside text-gray-600 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="mb-2">
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-6 rounded-full hover:shadow-lg transition-shadow">
                    Comprar Ahora
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 sm:py-24 px-4 bg-gradient-to-br from-gray-50 via-white to-purple-50 relative overflow-hidden">
          {/* Elemento decorativo de fondo */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              className="text-center mb-16 sm:mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center space-x-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span>💬</span>
                <span>¿Tienes preguntas?</span>
              </motion.div>

              <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                Estamos aquí para
                <span className="bg-gradient-to-r from-purple-700 to-indigo-800 bg-clip-text text-transparent"> ayudarte</span>
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Nuestro equipo de expertos está listo para resolver todas tus dudas y acompañarte en tu proceso de digitalización.
              </p>
            </motion.div>

            {/* Opciones de contacto */}
            <motion.div
              className="grid md:grid-cols-3 gap-6 mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="text-center p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group"
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                  <span className="text-2xl">📧</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600 mb-4">Respuesta en menos de 2 horas</p>
                <p className="text-purple-600 font-medium">soporte@facturacion.com</p>
              </motion.div>

              <motion.div
                className="text-center p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group"
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Chat en vivo</h3>
                <p className="text-gray-600 mb-4">Disponible 24/7</p>
                <p className="text-purple-600 font-medium">Iniciá conversación</p>
              </motion.div>

              <motion.div
                className="text-center p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group"
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                  <span className="text-2xl">📞</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Teléfono</h3>
                <p className="text-gray-600 mb-4">Lunes a viernes 8:00-18:00</p>
                <p className="text-purple-600 font-medium">+57 (1) 234-5678</p>
              </motion.div>
            </motion.div>

            {/* Botones de acción */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.button
                className="group flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl w-full sm:w-auto"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>📧</span>
                <span>Enviar Mensaje</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.button>

              <motion.button
                className="group flex items-center space-x-3 text-purple-700 px-8 py-4 rounded-xl hover:bg-purple-50 transition-all duration-300 font-semibold text-lg border-2 border-purple-200 hover:border-purple-300 w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>📅</span>
                <span>Agendar Demo</span>
              </motion.button>
            </motion.div>


          </div>
        </section>
        {/* Footer */}
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 relative overflow-hidden">
          {/* Elemento decorativo de fondo */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          </div>

          <div className="relative z-10">
            {/* Contenido principal del footer */}
            <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">

                {/* Columna 1: Logo y descripción */}
                <div className="sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-base sm:text-lg">IL</span>
                    </div>
                    <span className="text-xl sm:text-2xl font-bold text-white">InvoLuck</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 sm:mb-6">
                    La plataforma de facturación más completa para impulsar tu negocio hacia el éxito digital.
                  </p>
                  <div className="flex space-x-3 sm:space-x-4">
                    <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-colors duration-300 group">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </a>
                    <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-colors duration-300 group">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                      </svg>
                    </a>
                    <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-colors duration-300 group">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Columna 2: Producto */}
                <div>
                  <h3 className="text-white font-semibold text-base sm:text-lg mb-4 sm:mb-6">Producto</h3>
                  <ul className="space-y-2 sm:space-y-3">
                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base">Funcionalidades</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base">Planes y Precios</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base">Integraciones</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base">API</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base">Seguridad</a></li>
                  </ul>
                </div>

                {/* Columna 3: Soporte */}
                <div>
                  <h3 className="text-white font-semibold text-base sm:text-lg mb-4 sm:mb-6">Soporte</h3>
                  <ul className="space-y-2 sm:space-y-3">
                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base">Centro de Ayuda</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base">Documentación</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base">Contacto</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base">Estado del Sistema</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base">Comunidad</a></li>
                  </ul>
                </div>

                {/* Columna 4: Newsletter */}
                <div className="sm:col-span-2 lg:col-span-1">
                  <h3 className="text-white font-semibold text-base sm:text-lg mb-4 sm:mb-6">Newsletter</h3>
                  <p className="text-gray-300 text-sm mb-3 sm:mb-4">
                    Recibe las últimas novedades y consejos para hacer crecer tu negocio.
                  </p>
                  <div className="flex flex-col space-y-2 sm:space-y-3">
                    <input
                      type="email"
                      placeholder="tu@email.com"
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                    />
                    <button className="w-full px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 font-medium text-sm sm:text-base">
                      Suscribir
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 sm:mt-3">
                    No enviamos spam. Cancela en cualquier momento.
                  </p>
                </div>
              </div>
            </div>

            {/* Separador */}
            <div className="border-t border-gray-700"></div>

            {/* Footer bottom */}
            <div className="max-w-7xl mx-auto px-4 py-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                  <p className="text-sm text-gray-400">
                    &copy; 2025 InvoLuck. Todos los derechos reservados.
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <a href="#" className="hover:text-gray-300 transition-colors">Términos</a>
                    <span>•</span>
                    <a href="#" className="hover:text-gray-300 transition-colors">Privacidad</a>
                    <span>•</span>
                    <a href="#" className="hover:text-gray-300 transition-colors">Cookies</a>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <span>Hecho con</span>
                  <span className="text-red-400">❤️</span>
                  <span>en Colombia</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}