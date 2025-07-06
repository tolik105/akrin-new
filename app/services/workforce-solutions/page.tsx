import { Metadata } from 'next'
import { generateMetadata, generateServiceSchema } from '@/lib/seo'
import { ServiceHero } from "@/components/service-hero"
import { ServiceFeatureCard } from "@/components/service-feature-card"
import { ServiceCTASection } from "@/components/service-cta-section"
import { motion } from "framer-motion"
import { Users, Clock, Briefcase, TrendingUp, Shield, FileText, Zap, DollarSign, AlertTriangle } from "lucide-react"
import { useTranslation } from "react-i18next"

export const metadata: Metadata = generateMetadata({
  title: 'Workforce Solutions Japan | IT Staffing & Recruitment | Akrin',
  description: 'Professional workforce solutions in Japan including temporary staffing, contract-to-hire, direct placement, managed services, compliance, and payroll management. Expert IT recruitment services.',
  keywords: [
    'workforce solutions Japan',
    'IT staffing Tokyo',
    'IT recruitment Japan',
    'temporary staffing Tokyo',
    'contract to hire Japan',
    'direct placement IT',
    'managed staffing services',
    'IT talent acquisition Japan',
    'workforce management Tokyo',
    'IT contractor services Japan'
  ],
  path: '/services/workforce-solutions'
})

export default function WorkforceSolutionsPage() {
  const { t } = useTranslation('common')
  
  const workforceSolutions = [
    {
      icon: Users,
      title: t('servicePages.workforceSolutions.services.temporary'),
      description: t('servicePages.workforceSolutions.services.temporaryDesc'),
    },
    {
      icon: Clock,
      title: t('servicePages.workforceSolutions.services.contractToHire'),
      description: t('servicePages.workforceSolutions.services.contractToHireDesc'),
    },
    {
      icon: Briefcase,
      title: t('servicePages.workforceSolutions.services.directPlacement'),
      description: t('servicePages.workforceSolutions.services.directPlacementDesc'),
    },
    {
      icon: TrendingUp,
      title: t('servicePages.workforceSolutions.services.managed'),
      description: t('servicePages.workforceSolutions.services.managedDesc'),
    },
    {
      icon: Shield,
      title: t('servicePages.workforceSolutions.services.compliance'),
      description: t('servicePages.workforceSolutions.services.complianceDesc'),
    },
    {
      icon: FileText,
      title: t('servicePages.workforceSolutions.services.payroll'),
      description: t('servicePages.workforceSolutions.services.payrollDesc'),
    },
  ]

  const benefits = [
    {
      icon: Zap,
      title: t('servicePages.workforceSolutions.benefits.flexibilityTitle'),
      description: t('servicePages.workforceSolutions.benefits.flexibility'),
    },
    {
      icon: DollarSign,
      title: t('servicePages.workforceSolutions.benefits.costTitle'),
      description: t('servicePages.workforceSolutions.benefits.costControl'),
    },
    {
      icon: AlertTriangle,
      title: t('servicePages.workforceSolutions.benefits.riskTitle'),
      description: t('servicePages.workforceSolutions.benefits.riskMitigation'),
    },
  ]

  const serviceSchema = generateServiceSchema({
    name: 'Workforce Solutions',
    description: 'Professional workforce solutions including temporary staffing, contract-to-hire, direct placement, managed services, compliance, and payroll management for businesses in Japan.',
    serviceType: 'Workforce Solutions',
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
        title={t('servicePages.workforceSolutions.title')}
        subtitle={t('servicePages.workforceSolutions.subtitle')}
        ctaText={t('servicePages.workforceSolutions.cta.button')}
        ctaHref="/book-reservation"
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
              {t('servicePages.workforceSolutions.sections.services')}
            </h2>
          </motion.div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {workforceSolutions.map((solution, index) => (
              <ServiceFeatureCard
                key={index}
                icon={solution.icon}
                title={solution.title}
                description={solution.description}
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
              {t('servicePages.workforceSolutions.sections.benefits')}
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
        title={t('servicePages.workforceSolutions.cta.title')}
        description={t('servicePages.workforceSolutions.cta.description')}
        ctaText={t('servicePages.workforceSolutions.cta.button')}
        variant="primary"
      />
      </main>
    </>
  )
}
