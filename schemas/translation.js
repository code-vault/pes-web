const tranlations = {
  name: 'translation',
  title: 'Translations',
  type: 'document',
  fields: [
    {
      name: 'key',
      title: 'Translation Key',
      type: 'string',
      description: 'Dot notation key (e.g., hero.title, services.residential.title)',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Hero Section', value: 'hero' },
          { title: 'Services', value: 'services' },
          { title: 'About', value: 'about' },
          { title: 'Testimonials', value: 'testimonials' },
          { title: 'Contact', value: 'contact' },
          { title: 'Footer', value: 'footer' },
          { title: 'Header', value: 'header' },
          { title: 'FAQ', value: 'faq' },
          { title: 'Gallery', value: 'gallery' },
          { title: 'Common', value: 'common' }
        ]
      }
    },
    {
      name: 'english',
      title: 'English Text',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'hindi',
      title: 'Hindi Text',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'context',
      title: 'Context/Notes',
      type: 'text',
      description: 'Additional context for translators'
    },
    {
      name: 'isRichText',
      title: 'Contains Rich Text',
      type: 'boolean',
      description: 'Check if this text contains formatting like bold, italic, etc.'
    },
    {
      name: 'variables',
      title: 'Variables',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Variables used in this translation (e.g., {firstName}, {total})'
    }
  ],
  preview: {
    select: {
      title: 'key',
      subtitle: 'english',
      category: 'category'
    },
    prepare({ title, subtitle, category }) {
      return {
        title: title,
        subtitle: `${category}: ${subtitle?.slice(0, 50)}...`
      }
    }
  },
  orderings: [
    {
      title: 'By Category',
      name: 'categoryOrder',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'key', direction: 'asc' }
      ]
    }
  ]
}

export default tranlations;