'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
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
  UserIcon,
  EnvelopeIcon,
  ChatBubbleBottomCenterTextIcon,
  PhoneIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';
import Navbar from '@/components/pure/navbar/NavBar';

const features = [
  {
    icon: DocumentTextIcon,
    title: 'Intelligent Invoicing',
    description:
      'Create professional invoices in under 2 minutes with automatic calculation of totals, taxes, and high-quality PDF export.',
    benefits: [
      'Customizable templates',
      'Automatic calculations',
      'Instant export'
    ]
  },
  {
    icon: UsersIcon,
    title: 'Client Management',
    description:
      'Integrated CRM to manage all your client information, payment history, and centralized communication.',
    benefits: [
      'Centralized database',
      'Complete history',
      'Automated communication'
    ]
  },
  {
    icon: ChartBarIcon,
    title: 'Intuitive Dashboard',
    description:
      'Real-time financial analysis with key metrics, interactive charts, and custom reports.',
    benefits: [
      'Real-time metrics',
      'Automatic reports',
      'Predictive analysis'
    ]
  },
  {
    icon: ShieldCheckIcon,
    title: 'Enterprise Security',
    description:
      'Bank-level data protection with SSL encryption, automatic backups, and GDPR compliance.',
    benefits: ['256-bit SSL encryption', 'Automatic backups', 'Regulatory compliance']
  },
  {
    icon: GlobeAltIcon,
    title: 'Multi-location',
    description:
      'Support for multiple countries, currencies, and languages. Automatic international tax compliance.',
    benefits: ['50+ currencies', 'Multiple languages', 'Tax compliance']
  },
  {
    icon: BoltIcon,
    title: 'Advanced Automation',
    description:
      'Intelligent workflows, automatic reminders, and integration with your existing tech stack.',
    benefits: ['Custom workflows', 'Smart notifications', 'API integrations']
  }
];

const stats = [
  {
    label: 'Invoices Processed',
    value: '2.5M+',
    icon: DocumentTextIcon,
    color: 'text-blue-600'
  },
  {
    label: 'Active Companies',
    value: '15,000+',
    icon: BuildingOfficeIcon,
    color: 'text-green-600'
  },
  {
    label: 'Countries Supported',
    value: '120+',
    icon: GlobeAltIcon,
    color: 'text-purple-800'
  },
  {
    label: 'Time Saved',
    value: '85%',
    icon: ClockIcon,
    color: 'text-orange-600'
  },
  {
    label: 'Fiscal Accuracy',
    value: '99.9%',
    icon: CheckCircleIcon,
    color: 'text-emerald-600'
  },
  {
    label: 'Uptime SLA',
    value: '99.99%',
    icon: CloudIcon,
    color: 'text-indigo-600'
  }
];

const testimonials = [
  {
    name: 'Emily Carter',
    role: 'CEO, Design Studio',
    company: 'Freelancer',
    content:
      'InvoLuck completely transformed my invoicing process. What used to take hours, I now do in minutes.',
    avatar: 'EC',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'CFO, TechCorp',
    company: 'Medium Business',
    content:
      'The automation and reports have helped us optimize our cash flow and reduce errors by 90%.',
    avatar: 'MC',
    rating: 5
  },
  {
    name: 'Sophia Rodriguez',
    role: 'Controller, GlobalTrade',
    company: 'Large Enterprise',
    content:
      'The multi-currency support and international compliance allowed us to expand to 12 countries without complications.',
    avatar: 'SR',
    rating: 5
  }
];

const plans = [
  {
    name: 'Starter',
    price: '$29',
    currency: 'USD',
    period: 'month',
    description: 'Perfect for freelancers and small businesses',
    popular: false,
    features: [
      'Up to 100 invoices/month',
      'Basic client management',
      'Professional PDF export',
      'Basic dashboard',
      'Email support',
      '1 user included',
      'Basic templates',
      'Standard reports'
    ],
    cta: 'Start for free'
  },
  {
    name: 'Professional',
    price: '$99',
    currency: 'USD',
    period: 'month',
    description: 'Ideal for growing medium-sized businesses',
    popular: true,
    features: [
      'Up to 1,000 invoices/month',
      'Multi-user (up to 5 users)',
      'Advanced client management',
      'Detailed reports & analytics',
      'Priority support',
      'Basic integrations',
      'Workflow automation',
      'Basic custom branding',
      'Third-party API',
      'Recurring invoicing'
    ],
    cta: '14-day free trial'
  },
  {
    name: 'Business',
    price: '$299',
    currency: 'USD',
    period: 'month',
    description: 'For companies with advanced needs',
    popular: false,
    features: [
      'Unlimited invoices',
      'Unlimited users',
      'Full multi-location support',
      'Advanced integrations',
      'Full custom branding',
      '24/7 dedicated support',
      'Full API access',
      'Account manager',
      'Automatic tax compliance',
      'White-label available',
      'Guaranteed SLA',
      'Consulting included'
    ],
    cta: 'Contact sales'
  }
];

const processSteps = [
  {
    step: '01',
    title: 'Quick Signup',
    description: 'Create your account in less than 2 minutes. No credit card required.',
    icon: UserIcon
  },
  {
    step: '02',
    title: 'Set Up Your Company',
    description:
      'Import your data or complete your business profile with our smart assistant.',
    icon: CogIcon
  },
  {
    step: '03',
    title: 'Create Your First Invoice',
    description:
      'Use our professional templates or design your own. Automatic email delivery.',
    icon: DocumentCheckIcon
  },
  {
    step: '04',
    title: 'Analyze and Optimize',
    description:
      'Visualize your metrics, automate processes, and scale your business with smart insights.',
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
        <section
          id="home"
          className="pt-24 pb-20 px-4 bg-gradient-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden"
        >
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
              <motion.div
                className="inline-flex items-center space-x-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <StarIcon className="w-4 h-4" />
                <span>
                  Leader in digital invoicing • +15,000 companies trust us
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <span className="bg-gradient-to-r from-purple-800 to-purple-950 bg-clip-text text-transparent">
                  Invoicing
                </span>
                <br />
                <span className="text-gray-900">that Powers Your Business</span>
              </motion.h1>

              <motion.p
                className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                The most complete invoicing platform for{' '}
                <strong className="text-purple-800">freelancers</strong>,{' '}
                <strong className="text-purple-800">SMBs</strong>, and{' '}
                <strong className="text-purple-800">enterprises</strong>.
                <br className="hidden sm:block" />
                Automate your process, comply with international regulations, and
                scale without limits.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <motion.button
                  className="group flex items-center justify-center space-x-3 bg-purple-800 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl hover:bg-purple-900 transition-all duration-300 font-semibold text-lg sm:text-xl shadow-xl hover:shadow-2xl w-full sm:w-auto"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Get Started Free</span>
                  <ArrowRightIcon className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  className="group flex items-center justify-center space-x-3 text-purple-800 px-8 sm:px-10 py-4 sm:py-5 rounded-xl hover:bg-purple-50 transition-all duration-300 font-semibold text-lg sm:text-xl border-2 border-purple-200 hover:border-purple-300 w-full sm:w-auto"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <PlayIcon className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
                  <span>Watch Interactive Demo</span>
                </motion.button>
              </motion.div>
            </motion.div>

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
                        <IconComponent
                          className={`w-6 h-6 sm:w-8 sm:h-8 ${stat.color}`}
                        />
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
                Features that Make a Difference
              </h2>
              <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Professional tools designed to optimize every aspect of your
                invoicing process and business growth.
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
                    <div className="flex items-center justify-center w-16 h-16 bg-purple-800 rounded-xl mb-6 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-purple-800 transition-colors">
                      {feature.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                      {feature.description}
                    </p>

                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, idx) => (
                        <li
                          key={idx}
                          className="flex items-center space-x-2 text-sm text-gray-600"
                        >
                          <CheckCircleIcon className="w-4 h-4 text-purple-800 flex-shrink-0" />
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

        <section
          id="how-it-works"
          className="py-24 px-4 bg-gradient-to-br from-purple-50 to-blue-50"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold mb-6 text-gray-900">
                Get Started in 4 Simple Steps
              </h2>
              <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
                From zero to professional invoicing in under 10 minutes.
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
                        <IconComponent className="w-8 h-8 text-purple-800" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-800 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {step.step}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-4 text-gray-900">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

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
                What Our Clients Say
              </h2>
              <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
                Thousands of companies already trust InvoLuck for their
                invoicing.
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
                      <StarIcon
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>

                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    {testimonial.content}
                  </p>

                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-800 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role}
                      </div>
                      <div className="text-xs text-purple-800 font-medium">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="pricing"
          className="py-24 px-4 bg-gradient-to-br from-gray-50 to-purple-50"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold mb-6 text-gray-900">
                Transparent Pricing for Every Stage
              </h2>
              <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
                Start for free and scale when you need to. No surprises, no long-term
                commitments.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-10">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  className={`bg-white rounded-3xl p-10 relative border-2 transition-all duration-500 hover:shadow-2xl ${
                    plan.popular
                      ? 'border-purple-800 shadow-xl transform scale-105'
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
                      <span className="bg-purple-800 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center space-x-2">
                        <StarIcon className="w-4 h-4" />
                        <span>Most Popular</span>
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-10">
                    <h3 className="text-3xl font-bold text-gray-900 mb-3">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 mb-6 text-lg">
                      {plan.description}
                    </p>
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="text-6xl font-bold text-gray-900">
                        {plan.price}
                      </span>
                      <span className="text-gray-600 ml-2 text-xl">
                        {plan.currency}
                      </span>
                    </div>
                    <span className="text-gray-500 text-lg">
                      per {plan.period}
                    </span>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <CheckCircleIcon className="w-5 h-5 text-purple-800 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                      plan.popular
                        ? 'bg-purple-800 text-white hover:bg-purple-900 shadow-lg hover:shadow-xl'
                        : 'bg-gray-100 text-gray-700 hover:bg-purple-50 hover:text-purple-800 border border-gray-200 hover:border-purple-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {plan.cta}
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="py-20 sm:py-24 px-4 bg-gradient-to-br from-gray-50 via-white to-purple-50 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div
              className="absolute bottom-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
              style={{ animationDelay: '2s' }}
            ></div>
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
                <ChatBubbleBottomCenterTextIcon className="w-4 h-4" />
                <span>Have questions?</span>
              </motion.div>

              <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                We&apos;re here to
                <span className="bg-gradient-to-r from-purple-800 to-purple-950 bg-clip-text text-transparent">
                  {' '}
                  help
                </span>
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Our team of experts is ready to answer all your questions and
                guide you through your digital transformation process.
              </p>
            </motion.div>

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
                  <EnvelopeIcon className="w-8 h-8 text-purple-800" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Email
                </h3>
                <p className="text-gray-600 mb-4">
                  Response in under 2 hours
                </p>
                <p className="text-purple-800 font-medium">
                  support@involuck.com
                </p>
              </motion.div>

              <motion.div
                className="text-center p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group"
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                  <ChatBubbleBottomCenterTextIcon className="w-8 h-8 text-purple-800" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Live Chat
                </h3>
                <p className="text-gray-600 mb-4">Available 24/7</p>
                <p className="text-purple-800 font-medium">
                  Start a conversation
                </p>
              </motion.div>

              <motion.div
                className="text-center p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group"
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                  <PhoneIcon className="w-8 h-8 text-purple-800" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Phone
                </h3>
                <p className="text-gray-600 mb-4">Mon-Fri 8:00 AM - 6:00 PM</p>
                <p className="text-purple-800 font-medium">+1 (555) 123-4567</p>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.button
                className="group flex items-center space-x-3 bg-purple-800 text-white px-8 py-4 rounded-xl hover:bg-purple-900 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl w-full sm:w-auto"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <EnvelopeIcon className="w-5 h-5" />
                <span>Send Message</span>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                className="group flex items-center space-x-3 text-purple-800 px-8 py-4 rounded-xl hover:bg-purple-50 transition-all duration-300 font-semibold text-lg border-2 border-purple-200 hover:border-purple-300 w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CalendarDaysIcon className="w-5 h-5" />
                <span>Schedule Demo</span>
              </motion.button>
            </motion.div>
          </div>
        </section>

        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
                <div className="sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                    <Image
                      src="/api/logo"
                      alt="InvoLuck logo"
                      width={200}
                      height={96}
                      className="h-16 sm:h-20 lg:h-24 w-auto object-contain"
                    />
                    <span className="text-xl sm:text-2xl font-bold text-white">
                      InvoLuck
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 sm:mb-6">
                    The most complete invoicing platform to boost your business
                    towards digital success.
                  </p>
                  <div className="flex space-x-3 sm:space-x-4">
                    {/* Social media icons */}
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-semibold text-base sm:text-lg mb-4 sm:mb-6">
                    Product
                  </h3>
                  <ul className="space-y-2 sm:space-y-3">
                    <li>
                      <a
                        href="#features"
                        className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                      >
                        Features
                      </a>
                    </li>
                    <li>
                      <a
                        href="#pricing"
                        className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                      >
                        Plans & Pricing
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                      >
                        API
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                      >
                        Security
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-white font-semibold text-base sm:text-lg mb-4 sm:mb-6">
                    Support
                  </h3>
                  <ul className="space-y-2 sm:space-y-3">
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                      >
                        Help Center
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                      >
                        Documentation
                      </a>
                    </li>
                    <li>
                      <a
                        href="#contact"
                        className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                      >
                        Contact
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                      >
                        System Status
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                      >
                        Community
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="sm:col-span-2 lg:col-span-1">
                  <h3 className="text-white font-semibold text-base sm:text-lg mb-4 sm:mb-6">
                    Newsletter
                  </h3>
                  <p className="text-gray-300 text-sm mb-3 sm:mb-4">
                    Get the latest news and tips to grow your business.
                  </p>
                  <div className="flex flex-col space-y-2 sm:space-y-3">
                    <input
                      type="email"
                      placeholder="you@email.com"
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-transparent text-sm sm:text-base"
                    />
                    <button className="w-full px-4 py-2 sm:px-6 sm:py-3 bg-purple-800 text-white rounded-lg hover:bg-purple-900 transition-all duration-300 font-medium text-sm sm:text-base">
                      Subscribe
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 sm:mt-3">
                    No spam. Unsubscribe at any time.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700"></div>

            <div className="max-w-7xl mx-auto px-4 py-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                  <p className="text-sm text-gray-400">
                    &copy; 2025 InvoLuck. All rights reserved.
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <a
                      href="#"
                      className="hover:text-gray-300 transition-colors"
                    >
                      Terms
                    </a>
                    <span>•</span>
                    <a
                      href="#"
                      className="hover:text-gray-300 transition-colors"
                    >
                      Privacy
                    </a>
                    <span>•</span>
                    <a
                      href="#"
                      className="hover:text-gray-300 transition-colors"
                    >
                      Cookies
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <span>Made with</span>
                  <HeartIcon className="w-4 h-4 text-red-400" />
                  <span>in Colombia</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}