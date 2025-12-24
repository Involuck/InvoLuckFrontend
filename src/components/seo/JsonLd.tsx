type JsonLdProps = {
  data: Record<string, unknown>;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebsiteJsonLd({
  url,
  name,
  description
}: {
  url: string;
  name: string;
  description?: string;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url,
    name,
    ...(description && { description })
  };

  return <JsonLd data={data} />;
}

export function SoftwareApplicationJsonLd({
  name,
  applicationCategory,
  operatingSystem,
  description,
  url
}: {
  name: string;
  applicationCategory: string;
  operatingSystem: string;
  description?: string;
  url?: string;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    applicationCategory,
    operatingSystem,
    ...(description && { description }),
    ...(url && { url })
  };

  return <JsonLd data={data} />;
}

export function BreadcrumbJsonLd({
  items
}: {
  items: Array<{ name: string; url: string }>;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return <JsonLd data={data} />;
}
