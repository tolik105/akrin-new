import { Metadata } from 'next'
import { generateMetadata, generateServiceSchema } from '@/lib/seo'
import { ServiceHero } from "@/components/service-hero"
import { ServiceFeatureCard } from "@/components/service-feature-card"
import { ServiceCTASection } from "@/components/service-cta-section"
import { motion } from "framer-motion"
import { Database, BarChart, Search, Clock, DollarSign, Shield, TrendingUp, PiggyBank, Target } from "lucide-react"
import { useTranslation } from "react-i18next"

export const metadata: Metadata = generateMetadata({
  title: 'IT Asset Management Japan | Asset Tracking & Optimization | Akrin',
  description: 'Comprehensive IT asset management services in Japan including asset tracking, performance monitoring, lifecycle management, cost optimization, and compliance reporting. Optimize your IT investments.',
  keywords: [
    'IT asset management Japan',
    'asset tracking Tokyo',
    'IT inventory management',
    'asset lifecycle management',
    'IT cost optimization Japan',
    'compliance reporting IT',
    'asset discovery services',
    'performance monitoring Japan',
    'IT asset optimization',
    'enterprise asset management'
  ],
  path: '/services/asset-management'
})

export default function AssetManagementPage() {
  const { t } = useTranslation('common')
  
  const assetManagementServices = [
    {
      icon: Database,
      title: t('servicePages.assetManagement.features.assetTracking'),
      description: t('servicePages.assetManagement.features.realTimeTrackingDesc'),
    },
    {
      icon: BarChart,
      title: t('servicePages.assetManagement.features.performanceMonitoring'),
      description: t('servicePages.assetManagement.features.performanceMonitoringDesc'),
    },
    {
      icon: Search,
      title: t('servicePages.assetManagement.features.assetDiscovery'),
      description: t('servicePages.assetManagement.features.assetDiscoveryDesc'),
    },
    {
      icon: Clock,
      title: t('servicePages.assetManagement.features.lifecycleManagement'),
      description: t('servicePages.assetManagement.features.lifecycleManagementDesc'),
    },
    {
      icon: DollarSign,
      title: t('servicePages.assetManagement.features.costOptimization'),
      description: t('servicePages.assetManagement.features.costOptimizationDesc'),
    },
    {
      icon: Shield,
      title: t('servicePages.assetManagement.features.complianceReporting'),
      description: t('servicePages.assetManagement.features.complianceReportingDesc'),
    },
  ]

  const benefits = [
    {
      icon: TrendingUp,
      title: t('servicePages.assetManagement.benefits.improvedEfficiencyTitle'),
      description: t('servicePages.assetManagement.benefits.improvedEfficiencyDesc'),
    },
    {
      icon: PiggyBank,
      title: t('servicePages.assetManagement.benefits.costReductionTitle'),
      description: t('servicePages.assetManagement.benefits.reducedCosts'),
    },
    {
      icon: Target,
      title: t('servicePages.assetManagement.benefits.enhancedDecisionTitle'),
      description: t('servicePages.assetManagement.benefits.betterPlanning'),
    },
  ]

  const serviceSchema = generateServiceSchema({
    name: 'IT Asset Management Services',
    description: 'Comprehensive IT asset management services including asset tracking, performance monitoring, lifecycle management, cost optimization, and compliance reporting for businesses in Japan.',
    serviceType: 'IT Asset Management Services',
    areaServed: ['JP', 'Tokyo', 'Osaka', 'Worldwide']
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema)
        }}
      />
      <main className="flex min-h-screen flex-col">
      <ServiceHero
        title={t('servicePages.assetManagement.title')}
        subtitle={t('servicePages.assetManagement.subtitle')}
        ctaText={t('servicePages.assetManagement.cta.button')}
      />

      <section className="py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('servicePages.assetManagement.sections.features')}
            </h2>
          </motion.div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {assetManagementServices.map((service, index) => (
              <ServiceFeatureCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                index={index}
                variant={index % 3 === 0 ? 'gradient' : 'default'}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-accent">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('servicePages.assetManagement.sections.benefits')}
            </h2>
          </motion.div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <ServiceFeatureCard
                key={index}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
                index={index}
                variant="bordered"
              />
            ))}
          </div>
        </div>
      </section>

      <ServiceCTASection
        title={t('servicePages.assetManagement.cta.title')}
        description={t('servicePages.assetManagement.cta.description')}
        ctaText={t('servicePages.assetManagement.cta.button')}
        variant="gradient"
      />
      </main>
    </>
  )
}
