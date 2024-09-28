import { upcomingL2 } from './templates/upcoming'
import { Layer2 } from './types'

export const soon: Layer2 = upcomingL2({
  id: 'soon',
  display: {
    name: 'Soon Mainet',
    slug: 'soon',
    description:
      'SOON is a Layer 2 chain built on top of the SOON Stack, which itself is based on the OP Stack, but introduces the Decoupled Solana Virtual Machine (SVM).',
    purposes: ['Universal'],
    category: 'Optimistic Rollup',
    links: {
      websites: ['https://soo.network/'],
      apps: [],
      documentation: ['https://soon-2.gitbook.io/home'],
      explorers: [],
      repositories: [],
      socialMedia: ['https://x.com/soon_svm'],
    },
  },
})