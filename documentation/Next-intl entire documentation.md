App Router setup with i18n routing
In order to use unique pathnames for every language that your app supports, next-intl can be used to handle the following routing setups:

Prefix-based routing (e.g. /en/about)
Domain-based routing (e.g. en.example.com/about)
In either case, next-intl integrates with the App Router by using a top-level [locale] dynamic segment that can be used to provide content in different languages.

Getting started
If you haven’t done so already, create a Next.js app that uses the App Router and run:

npm install next-intl

Now, we’re going to create the following file structure:

├── messages
│   ├── en.json
│   └── ...
├── next.config.ts
└── src
    ├── i18n
    │   ├── routing.ts
    │   ├── navigation.ts
    │   └── request.ts
    ├── middleware.ts
    └── app
        └── [locale]
            ├── layout.tsx
            └── page.tsx

In case you’re migrating an existing app to next-intl, you’ll typically move your existing pages into the [locale] folder as part of the setup.

Let’s set up the files:

messages/en.json
Messages represent the translations that are available per language and can be provided either locally or loaded from a remote data source.

The simplest option is to add JSON files in your local project folder:

messages/en.json
{
  "HomePage": {
    "title": "Hello world!",
    "about": "Go to the about page"
  }
}

next.config.ts
Now, set up the plugin which creates an alias to provide a request-specific i18n configuration to Server Components—more on this in the following steps.

next.config.ts
import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

src/i18n/routing.ts
We’ll integrate with Next.js’ routing in two places:

Middleware: Negotiates the locale and handles redirects & rewrites (e.g. / → /en)
Navigation APIs: Lightweight wrappers around Next.js’ navigation APIs like <Link />
This enables you to work with pathnames like /about, while i18n aspects like language prefixes are handled behind the scenes.

To share the configuration between these two places, we’ll set up routing.ts:

src/i18n/routing.ts
import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'de'],
 
  // Used when no locale matches
  defaultLocale: 'en'
});

Depending on your requirements, you may wish to customize your routing configuration later—but let’s finish with the setup first.

src/i18n/navigation.ts
Once we have our routing configuration in place, we can use it to set up the navigation APIs.

src/i18n/navigation.ts
import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';
 
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);

src/middleware.ts
Additionally, we can use our routing configuration to set up the middleware.

src/middleware.ts
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
export default createMiddleware(routing);
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|en)/:path*']
};

src/i18n/request.ts
When using features from next-intl in Server Components, the relevant configuration is read from a central module that is located at i18n/request.ts by convention. This configuration is scoped to the current request and can be used to provide messages and other options based on the user’s locale.

src/i18n/request.ts
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
 
export default getRequestConfig(async ({requestLocale}) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;
 
  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }
 
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});

src/app/[locale]/layout.tsx
The locale that was matched by the middleware is available via the locale param and can be used to configure the document language. Additionally, we can use this place to pass configuration from i18n/request.ts to Client Components via NextIntlClientProvider.

app/[locale]/layout.tsx
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
 
export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
 
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

Note that NextIntlClientProvider automatically inherits configuration from i18n/request.ts here, but messages need to be passed explicitly.

src/app/[locale]/page.tsx
And that’s it!

Now you can use translations and other functionality from next-intl in your components:

app/[locale]/page.tsx
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
 
export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <div>
      <h1>{t('title')}</h1>
      <Link href="/about">{t('about')}</Link>
    </div>
  );
}

In case you ran into an issue, have a look at the App Router example to explore a working app.

Next steps:

Usage guide: Learn how to format messages, dates and times

Routing: Set up localized pathnames, domain-based routing & more

Workflows: Integrate deeply with TypeScript and other tools

Static rendering
When using the setup with i18n routing, next-intl will currently opt into dynamic rendering when APIs like useTranslations are used in Server Components. This is a limitation that we aim to remove in the future, but as a stopgap solution, next-intl provides a temporary API that can be used to enable static rendering.

Add generateStaticParams
Since we are using a dynamic route segment for the [locale] param, we need to pass all possible values to Next.js via generateStaticParams so that the routes can be rendered at build time.

Depending on your needs, you can add generateStaticParams either to a layout or pages:

Layout: Enables static rendering for all pages within this layout (e.g. app/[locale]/layout.tsx)
Individual pages: Enables static rendering for a specific page (e.g. app/[locale]/page.tsx)
Example:

import {routing} from '@/i18n/routing';
 
export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

Add setRequestLocale to all relevant layouts and pages
next-intl provides an API that can be used to distribute the locale that is received via params in layouts and pages for usage in all Server Components that are rendered as part of the request.

app/[locale]/layout.tsx
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
 
export default async function LocaleLayout({children, params}) {
  const {locale} = await params;
 
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
 
  // Enable static rendering
  setRequestLocale(locale);
 
  return (
    // ...
  );
}

app/[locale]/page.tsx
import {setRequestLocale} from 'next-intl/server';
 
export default function IndexPage({params}) {
  const {locale} = use(params);
 
  // Enable static rendering
  setRequestLocale(locale);
 
  // Once the request locale is set, you
  // can call hooks from `next-intl`
  const t = useTranslations('IndexPage');
 
  return (
    // ...
  );
}

Keep in mind that:

The locale that you pass to setRequestLocale should be validated (e.g. in your root layout).
You need to call this function in every page and every layout that you intend to enable static rendering for since Next.js can render layouts and pages independently.
setRequestLocale needs to be called before you invoke any functions from next-intl like useTranslations or getMessages.
Use the locale param in metadata
In addition to the rendering of your pages, also page metadata needs to qualify for static rendering.

To achieve this, you can forward the locale that you receive from Next.js via params to the awaitable functions from next-intl.

page.tsx
import {getTranslations} from 'next-intl/server';
 
export async function generateMetadata({params}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Metadata'});
 
  return {
    title: t('title')
  };
}\


Usage guide
This guide explains how next-intl can be used in React components.

Note that while it might be helpful to get an overview of the capabilities of next-intl, you don’t have to read the whole usage guide upfront. Rather, you can come back to it as necessary.

Let’s get started:

Render messages in components


Rendering i18n messages
The main part of handling internationalization (typically referred to as i18n) in your Next.js app is to provide messages based on the language of the user.

Terminology
Locale: We use this term to describe an identifier that contains the language and formatting preferences of users. Apart from the language, a locale can include optional regional information (e.g. en-US). Locales are specified as IETF BCP 47 language tags.
Messages: These are collections of namespace-label pairs that are grouped by locale (e.g. en-US.json).
Structuring messages
To group your messages within a locale, it’s recommended to use component names as namespaces and embrace them as the primary unit of code organization in your app. You can of course also use a different structure, depending on what suits your app best.

en.json
{
  "About": {
    "title": "About us"
  }
}

You can render messages from within a React component via the useTranslations hook:

About.tsx
import {useTranslations} from 'next-intl';
 
function About() {
  const t = useTranslations('About');
  return <h1>{t('title')}</h1>;
}

To retrieve all available messages in a component, you can omit the namespace path:

const t = useTranslations();
 
t('About.title');

Translators can collaborate on messages by using a localization management solution like Crowdin.

Rendering messages with useTranslations
next-intl uses ICU message syntax that allows you to express language nuances and separates state handling within messages from your app code.

Static messages
Static messages will be used as-is:

en.json
"message": "Hello world!"

t('message'); // "Hello world!"

Interpolation of dynamic values
Dynamic values can be inserted into messages by using curly braces:

en.json
"message": "Hello {name}!"

t('message', {name: 'Jane'}); // "Hello Jane!"

Cardinal pluralization
To express the pluralization of a given number of items, the plural argument can be used:

en.json
"message": "You have {count, plural, =0 {no followers yet} =1 {one follower} other {# followers}}."

t('message', {count: 3580}); // "You have 3,580 followers."

Note that by using the # marker, the value will be formatted as a number.

Ordinal pluralization
To apply pluralization based on an order of items, the selectordinal argument can be used:

en.json
"message": "It's your {year, selectordinal, one {#st} two {#nd} few {#rd} other {#th}} birthday!"

Selecting enum-based values
To map identifiers to human readable labels, you can use the select argument that works similar to the switch statement in JavaScript:

en.json
"message": "{gender, select, female {She} male {He} other {They}} is online."

t('message', {gender: 'female'}); // "She is online."

Note: The other case is required and will be used when none of the specific values match.

Escaping
Since curly braces are used for interpolating dynamic values, you can escape them with the ' marker to use the actual symbol in messages:

en.json
"message": "Escape curly braces with single quotes (e.g. '{name'})"

t('message'); // "Escape curly braces with single quotes (e.g. {name})"

Rich text
You can format rich text with custom tags and map them to React components via t.rich:

en.json
{
  "message": "Please refer to <guidelines>the guidelines</guidelines>."
}

// Returns `<>Please refer to <a href="/guidelines">the guidelines</a>.</>`
t.rich('message', {
  guidelines: (chunks) => <a href="/guidelines">{chunks}</a>
});

Tags can be arbitrarily nested (e.g. This is <important><very>very</very> important</important>).

HTML markup
To render rich text, you typically want to use rich text formatting. However, if you have a use case where you need to emit raw HTML markup, you can use the t.markup function:

en.json
{
  "markup": "This is <important>important</important>"
}

// Returns 'This is <b>important</b>'
t.markup('markup', {
  important: (chunks) => `<b>${chunks}</b>`
});

Note that unlike t.rich, the provided markup functions accept chunks as a string and also return a string where the chunks are wrapped accordingly.

Raw messages
Messages are always parsed and therefore e.g. for rich text formatting you need to supply the necessary tags. If you want to avoid the parsing, e.g. because you have raw HTML stored in a message, there’s a separate API for this use case:

en.json
{
  "content": "<h1>Headline</h1><p>This is raw HTML</p>"
}

<div dangerouslySetInnerHTML={{__html: t.raw('content')}} />

Important: You should always sanitize the content that you pass to dangerouslySetInnerHTML to avoid cross-site scripting attacks.

The value of a raw message can be any valid JSON value: strings, booleans, objects and arrays.

Optional messages
If you have messages that are only available for certain locales, you can use the t.has function to check whether a message is available for the current locale:

const t = useTranslations('About');
 
t.has('title'); // true
t.has('unknown'); // false

Note that separately from this, you can also provide fallback messages, e.g. from the default locale, in case you have incomplete messages for certain locales.

Arrays of messages
If you need to render a list of messages, the recommended approach is to map an array of keys to the corresponding messages:

en.json
{
  "CompanyStats": {
    "yearsOfService": {
      "title": "Years of service",
      "value": "34"
    },
    "happyClients": {
      "title": "Happy clients",
      "value": "1.000+"
    },
    "partners": {
      "title": "Products",
      "value": "5.000+"
    }
  }
}

CompanyStats.tsx
import {useTranslations} from 'next-intl';
 
function CompanyStats() {
  const t = useTranslations('CompanyStats');
  const keys = ['yearsOfService', 'happyClients', 'partners'] as const;
 
  return (
    <ul>
      {keys.map((key) => (
        <li key={key}>
          <h2>{t(`${key}.title`)}</h2>
          <p>{t(`${key}.value`)}</p>
        </li>
      ))}
    </ul>
  );
}

Right-to-left languages
Languages such as Arabic, Hebrew and Persian use right-to-left script (often abbreviated as RTL). For these languages, writing begins on the right side of the page and continues to the left.

Example:

النص في اللغة العربية _مثلا_ يُقرأ من اليمين لليسار

In addition to providing translated messages, proper RTL localization requires:

Providing the dir attribute on the document
Layout mirroring, e.g. by using CSS logical properties
Element mirroring, e.g. by customizing icons
To handle these cases in your components, you can use the rtl-detect package:

layout.tsx
import {getLangDir} from 'rtl-detect';
 
export default async function RootLayout(/* ... */) {
  const locale = await getLocale();
  const direction = getLangDir(locale);
 
  return (
    <html lang={locale} dir={direction}>
      {/* ... */}
    </html>
  );
}

components/Breadcrumbs.tsx
import {useTranslations} from 'next-intl';
import {getLangDir} from 'rtl-detect';
 
export default function Breadcrumbs({children, params}) {
  const t = useTranslations('Breadcrumbs');
  const locale = useLocale();
  const direction = getLangDir(locale);
 
  return (
    <div style={{display: 'flex'}}>
      <p>{t('home')}</p>
      <div style={{marginInlineStart: 10}}>
        {direction === 'ltr' ? <ArrowRight /> : <ArrowLeft />}
      </div>
      <p style={{marginInlineStart: 10}}>{t('about')}</p>
    </div>
  );
}

Last updated on November 5, 2024

Docs
Usage guide
Numbers
Number formatting
The formatting of numbers can vary depending on the user’s locale and may include different rules such as:

Decimal separators (e.g. “12.3” in en-US vs. “12,3” in de-DE)
Digit grouping (e.g. “120,000” in en-US vs. “1,20,000” in hi-IN)
Currency sign position (e.g. “12 €” in de-DE vs. ”€ 12” in de-AT)
By using the formatting capabilities provided by next-intl, you can adjust to these variations and ensure that numbers are displayed accurately across your Next.js app for all users.

Formatting plain numbers
When you’re formatting plain numbers that are not part of a message, you can use a separate hook:

import {useFormatter} from 'next-intl';
 
function Component() {
  const format = useFormatter();
 
  // Renders "$499.90"
  format.number(499.9, {style: 'currency', currency: 'USD'});
}

See the MDN docs about NumberFormat to learn more about the options you can pass to the number function or try the interactive explorer for Intl.NumberFormat.

If you have global formats configured, you can reference them by passing a name as the second argument:

format.number(499.9, 'precise');

Numbers within messages
Numbers can be embedded within messages by using the ICU syntax.

en.json
{
  "basic": "Basic formatting: {value, number}",
  "percentage": "Displayed as a percentage: {value, number, percent}",
  "custom": "At most 2 fraction digits: {value, number, ::.##}"
}

Note the leading :: that is used to indicate that a skeleton should be used. See the ICU docs about number skeletons to learn more about this.

These formats are supported out of the box: currency and percent.

If you work with translators, it can be helpful for them to use an editor that supports the ICU syntax for numbers (e.g. the Crowdin Editor).

Custom number formats
To use custom formats in messages, you can provide formatters that can be referenced by name.

en.json
{
  "price": "This product costs {price, number, currency}"
}

t(
  'price',
  {price: 32000.99},
  {
    number: {
      currency: {
        style: 'currency',
        currency: 'EUR'
      }
    }
  }
);

To reuse number formats for multiple components, you can configure global formats.


Date and time formatting
The formatting of dates and times varies greatly between locales (e.g. “Apr 24, 2023” in en-US vs. “24 квіт. 2023 р.” in uk-UA). By using the formatting capabilities of next-intl, you can handle i18n differences in your Next.js app automatically.

Formatting dates and times
You can format plain dates that are not part of a message with the dateTime function that is returned from the useFormatter hook:

import {useFormatter} from 'next-intl';
 
function Component() {
  const format = useFormatter();
  const dateTime = new Date('2020-11-20T10:36:01.516Z');
 
  // Renders "Nov 20, 2020"
  format.dateTime(dateTime, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
 
  // Renders "11:36 AM"
  format.dateTime(dateTime, {hour: 'numeric', minute: 'numeric'});
}

See the MDN docs about DateTimeFormat to learn more about the options that you can provide to the dateTime function or try the interactive explorer for Intl.DateTimeFormat.

If you have global formats configured, you can reference them by passing a name as the second argument:

format.dateTime(dateTime, 'short');

Formatting relative times
You can format plain dates that are not part of a message with the relativeTime function:

import {useFormatter} from 'next-intl';
 
function Component() {
  const format = useFormatter();
  const dateTime = new Date('2020-11-20T08:30:00.000Z');
 
  // At 2020-11-20T10:36:00.000Z,
  // this will render "2 hours ago"
  format.relativeTime(dateTime);
}

Note that values are rounded, so e.g. if 126 minutes have passed, “2 hours ago” will be returned.

Supplying now
By default, relativeTime will use the global value for now. If you want to use a different value, you can explicitly pass this as the second parameter.

import {useFormatter} from 'next-intl';
 
function Component() {
  const format = useFormatter();
  const dateTime = new Date('2020-11-20T08:30:00.000Z');
  const now = new Date('2020-11-20T10:36:00.000Z');
 
  // Renders "2 hours ago"
  format.relativeTime(dateTime, now);
}

If you want the relative time value to update over time, you can do so with the useNow hook:

import {useNow, useFormatter} from 'next-intl';
 
function Component() {
  // Use the global now value initially …
  const now = useNow({
    // … and update it every 10 seconds
    updateInterval: 1000 * 10
  });
 
  const format = useFormatter();
  const dateTime = new Date('2020-11-20T10:36:01.516Z');
 
  // Renders e.g. "2 hours ago" and updates continuously
  format.relativeTime(dateTime, now);
}

Customizing the unit
By default, relativeTime will pick a unit based on the difference between the passed date and now (e.g. 3 seconds, 40 minutes, 4 days, etc.).

If you want to use a specific unit, you can provide options via the second argument:

import {useFormatter} from 'next-intl';
 
function Component() {
  const format = useFormatter();
  const dateTime = new Date('2020-03-20T08:30:00.000Z');
  const now = new Date('2020-11-22T10:36:00.000Z');
 
  // Renders "247 days ago"
  format.relativeTime(dateTime, {now, unit: 'day'});
}

Formatting date and time ranges
You can format ranges of dates and times with the dateTimeRange function:

import {useFormatter} from 'next-intl';
 
function Component() {
  const format = useFormatter();
  const dateTimeA = new Date('2020-11-20T08:30:00.000Z');
  const dateTimeB = new Date('2021-01-24T08:30:00.000Z');
 
  // Renders "Nov 20, 2020 – Jan 24, 2021"
  format.dateTimeRange(dateTimeA, dateTimeB, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

If you have global formats configured, you can reference them by passing a name as the trailing argument:

format.dateTimeRange(dateTimeA, dateTimeB, 'short');

Dates and times within messages
Dates and times can be embedded within messages by using the ICU syntax.

en.json
{
  "ordered": "Ordered on {orderDate, date, medium}"
}

These formats are supported out of the box: full, long, medium and short.

If you work with translators, it can be helpful for them to use an editor that supports the ICU syntax for dates and times (e.g. the Crowdin Editor).

You can customize the formatting by using date skeletons:

en.json
{
  // Renders e.g. "Ordered on Jul 9, 2024"
  "ordered": "Ordered on {orderDate, date, ::yyyyMMMd}"
}

Note the leading :: that is used to indicate that a skeleton should be used.

These formats from ICU are supported:

Symbol	Meaning	Pattern	Example
G	Era designator (includes the date)	G
GGGG
GGGGG	7/9/2024 AD
7/9/2024 Anno Domini
7/9/2024 A
y	Year	y
yy
yyyy	2024
24
2024
M	Month in year	M
MM
MMM
MMMM
MMMMM
7
07
Jul
July
J
d	Day in month	d
dd	9
09
E	Day of week	E
EEEE
EEEEE	Tue
Tuesday
T
h	Hour (1-12)	h
hh	9 AM
09 AM
K	Hour (0-11)	K
KK	0 AM (12 AM with h)
00 AM
H	Hour (0-23)	HH	09
k	Hour (1-24)	kk	24 (00 with H)
m	Minute (2 digits if used with seconds)	m
mmss	6
06:03
s	Second (2 digits if used with minutes)	s
mmss	3
06:03
z	Time zone	z
zzzz	GMT+2
Central European Summer Time
Patterns can be combined with each other, therefore e.g. yyyyMMMd would return “Jul 9, 2024”.

Custom date and time formats
To use custom formats in messages, you can provide formatters based on DateTimeFormat options that can be referenced by name.

en.json
{
  "ordered": "Ordered on {orderDate, date, short}"
}

t(
  'ordered',
  {orderDate: new Date('2020-11-20T10:36:01.516Z')},
  {
    dateTime: {
      short: {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }
    }
  }
);

To reuse date and time formats for multiple components, you can configure global formats.

List formatting
When working with lists of items, you might want to format them as conjunctions or disjunctions.

Formatting aspects, like the used separators, differ per locale:

“HTML, CSS, and JavaScript” in en-US
“HTML, CSS und JavaScript” in de-DE
List formatting can be applied with the useFormatter hook:

import {useFormatter} from 'next-intl';
 
function Component() {
  const format = useFormatter();
  const items = ['HTML', 'CSS', 'JavaScript'];
 
  // Renders "HTML, CSS, and JavaScript"
  format.list(items, {type: 'conjunction'});
 
  // Renders "HTML, CSS, or JavaScript"
  format.list(items, {type: 'disjunction'});
}

See the MDN docs about ListFormat to learn more about the options that you can provide to the list function or try the interactive explorer for Intl.ListFormat).

Note that lists can currently only be formatted via useFormatter, there’s no equivalent inline syntax for messages at this point.

To reuse list formats for multiple components, you can configure global formats.

Formatting of React elements
Apart from string values, you can also pass arrays of React elements to the formatting function:

import {useFormatter} from 'next-intl';
 
function Component() {
  const format = useFormatter();
 
  const users = [
    {id: 1, name: 'Alice'},
    {id: 2, name: 'Bob'},
    {id: 3, name: 'Charlie'}
  ];
 
  const items = users.map((user) => (
    <a key={user.id} href={`/user/${user.id}`}>
      {user.name}
    </a>
  ));
 
  return <p>{format.list(items)}</p>;
}

Result:

<p>
  <a href="/user/1">Alice</a>, <a href="/user/2">Bob</a>, and
  <a href="/user/3">Charlie</a>
</p>

Note that format.list will return an Iterable<ReactElement> in this case.

Last updated on October 23, 2024

Global configuration
Configuration properties that you use across your Next.js app can be set globally.

Server & Client Components
Depending on if you handle internationalization in Server- or Client Components, the configuration from i18n/request.ts or NextIntlClientProvider will be applied respectively.

i18n/request.ts & getRequestConfig
i18n/request.ts can be used to provide configuration for server-only code, i.e. Server Components, Server Actions & friends. The configuration is provided via the getRequestConfig function and needs to be set up based on whether you’re using i18n routing or not.

i18n/request.ts
import {getRequestConfig} from 'next-intl/server';
import {routing} from '@/i18n/routing';
 
export default getRequestConfig(async ({requestLocale}) => {
  // This typically corresponds to the `[locale]` segment.
  let locale = await requestLocale;
 
  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }
 
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});

The configuration object is created once for each request by internally using React’s cache. The first component to use internationalization will call the function defined with getRequestConfig.

Since this function is executed during the Server Components render pass, you can call functions like cookies() and headers() to return configuration that is request-specific.

NextIntlClientProvider
NextIntlClientProvider can be used to provide configuration for Client Components.

layout.tsx
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
 
export default async function RootLayout(/* ... */) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
 
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

These props are inherited if you’re rendering NextIntlClientProvider from a Server Component:

locale
now
timeZone
In contrast, these props can be provided as necessary:

messages (see Internationalization in Client Components)
formats
defaultTranslationValues
onError and getMessageFallback
Messages
The most crucial aspect of internationalization is providing labels based on the user’s language. The recommended workflow is to store your messages in your repository along with the code.

├── messages
│   ├── en.json
│   ├── de-AT.json
│   └── ...
...

Colocating your messages with app code is beneficial because it allows developers to make changes quickly and additionally, you can use the shape of your local messages for type checking. Translators can collaborate on messages by using CI tools, such as Crowdin’s GitHub integration, which allows changes to be synchronized directly into your code repository.

That being said, next-intl is agnostic to how you store messages and allows you to freely define an async function that fetches them while your app renders:

i18n/request.ts
import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async () => {
  return {
    messages: (await import(`../../messages/${locale}.json`)).default
    // ...
  };
});

After messages are configured, they can be used via useTranslations.

In case you require access to messages in a component, you can read them via useMessages() or getMessages() from your configuration:

// Regular components
import {useMessages} from 'next-intl';
const messages = useMessages();
 
// Async Server Components
import {getMessages} from 'next-intl/server';
const messages = await getMessages();

Time zone
Specifying a time zone affects the rendering of dates and times. By default, the time zone of the server runtime will be used, but can be customized as necessary.

i18n/request.ts
import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async () => {
  return {
    // The time zone can either be statically defined, read from the
    // user profile if you store such a setting, or based on dynamic
    // request information like the locale or a cookie.
    timeZone: 'Europe/Vienna'
 
    // ...
  };
});

The available time zone names can be looked up in the tz database.

The configured time zone can be read via useTimeZone or getTimeZone in components:

// Regular components
import {useTimeZone} from 'next-intl';
const timeZone = useTimeZone();
 
// Async Server Components
import {getTimeZone} from 'next-intl/server';
const timeZone = await getTimeZone();

The time zone in Client Components is automatically inherited from the server side if you wrap the relevant components in a NextIntlClientProvider that is rendered by a Server Component. For all other cases, you can specify the value explicitly on a wrapping NextIntlClientProvider.

Now value
When formatting relative dates and times, next-intl will format times in relation to a reference point in time that is referred to as “now”. By default, this is the time a component renders.

If you prefer to override the default, you can provide an explicit value for now:

i18n/request.ts
import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async () => {
  return {
    // This is the default, a single date instance will be
    // used by all Server Components to ensure consistency.
    // Tip: This value can be mocked to a constant value
    // for consistent results in end-to-end-tests.
    now: new Date()
 
    // ...
  };
});

The configured now value can be read in components via useNow or getNow:

// Regular components
import {useNow} from 'next-intl';
const now = useNow();
 
// Async Server Components
import {getNow} from 'next-intl/server';
const now = await getNow();

Similarly to the timeZone, the now value in Client Components is automatically inherited from the server side if you wrap the relevant components in a NextIntlClientProvider that is rendered by a Server Component.

Formats
To achieve consistent date, time, number and list formatting, you can define a set of global formats.

i18n/request.ts
import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async () => {
  return {
    formats: {
      dateTime: {
        short: {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }
      },
      number: {
        precise: {
          maximumFractionDigits: 5
        }
      },
      list: {
        enumeration: {
          style: 'long',
          type: 'conjunction'
        }
      }
    }
 
    // ...
  };
});

Note that formats are not automatically inherited by Client Components. If you want to make this available in Client Components, you should provide the same configuration to NextIntlClientProvider.

Once you have formats set up, you can use them in your components via useFormatter:

import {useFormatter} from 'next-intl';
 
function Component() {
  const format = useFormatter();
 
  format.dateTime(new Date('2020-11-20T10:36:01.516Z'), 'short');
  format.number(47.414329182, 'precise');
  format.list(['HTML', 'CSS', 'JavaScript'], 'enumeration');
}

You can optionally specify a global type for formats to get autocompletion and type safety.

Global formats for numbers, dates and times can be referenced in messages too:

en.json
{
  "ordered": "You've ordered this product on {orderDate, date, short}",
  "latitude": "Latitude: {latitude, number, precise}"
}

import {useTranslations} from 'next-intl';
 
function Component() {
  const t = useTranslations();
 
  t('ordered', {orderDate: new Date('2020-11-20T10:36:01.516Z')});
  t('latitude', {latitude: 47.414329182});
}

Default translation values (deprecated)
This feature is deprecated and will be removed in the next major version of next-intl (alternative).

To achieve consistent usage of translation values and reduce redundancy, you can define a set of global default values. This configuration can also be used to apply consistent styling of commonly used rich text elements.

i18n/request.tsx
import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async () => {
  return {
    defaultTranslationValues: {
      important: (chunks) => <b>{chunks}</b>,
      value: 123
    }
 
    // ...
  };
});

Note that defaultTranslationValues are not automatically inherited by Client Components. If you want to make this available in Client Components, you should provide the same configuration to NextIntlClientProvider.

Error handling (onError & getMessageFallback)
By default, when a message fails to resolve or when the formatting failed, an error will be printed on the console. In this case ${namespace}.${key} will be rendered instead to keep your app running.

This behavior can be customized with the onError and getMessageFallback configuration option.

i18n/request.ts
import {getRequestConfig} from 'next-intl/server';
import {IntlErrorCode} from 'next-intl';
 
export default getRequestConfig(async () => {
  return {
    onError(error) {
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        // Missing translations are expected and should only log an error
        console.error(error);
      } else {
        // Other errors indicate a bug in the app and should be reported
        reportToErrorTracking(error);
      }
    },
 
    getMessageFallback({namespace, key, error}) {
      const path = [namespace, key].filter((part) => part != null).join('.');
 
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        return path + ' is not yet translated';
      } else {
        return 'Dear developer, please fix this message: ' + path;
      }
    }
 
    // ...
  };
});

Note that onError and getMessageFallback are not automatically inherited by Client Components. If you want to make this functionality available in Client Components, you should provide the same configuration to NextIntlClientProvider.

Locale
The current locale of your app is automatically incorporated into hooks like useTranslations & useFormatter and will affect the rendered output.

In case you need to use this value in other places of your app, e.g. to implement a locale switcher or to pass it to API calls, you can read it via useLocale or getLocale:

// Regular components
import {useLocale} from 'next-intl';
const locale = useLocale();
 
// Async Server Components
import {getLocale} from 'next-intl/server';
const locale = await getLocale();

Depending on if you’re using i18n routing, the locale can be changed as follows:

With i18n routing: The locale is managed by the router and can be changed by using navigation APIs from next-intl like Link or useRouter.
Without i18n routing: You can change the locale by updating the value where the locale is read from (e.g. a cookie, a user setting, etc.). If you’re looking for inspiration, you can have a look at the App Router without i18n routing example that manages the locale via a cookie.
The returned value is resolved based on these priorities:

Server Components: If you’re using i18n routing, the returned locale is the one that you’ve either provided via setRequestLocale or alternatively the one in the [locale] segment that was matched by the middleware. If you’re not using i18n routing, the returned locale is the one that you’ve provided via getRequestConfig.
Client Components: In this case, the locale is received from NextIntlClientProvider or alternatively useParams().locale. Note that NextIntlClientProvider automatically inherits the locale if the component is rendered by a Server Component. For all other cases, you can specify the value explicitly.
If you use internationalized routing with the Pages Router, you can receive the locale from the router in order to pass it to NextIntlClientProvider:

_app.tsx
import {useRouter} from 'next/router';
 
// ...
 
const router = useRouter();
 
return (
  <NextIntlClientProvider locale={router.locale}>
    ...
  </NextIntlClientProvider>;
);

Last updated on February 27, 2025


Docs
Routing
Next.js internationalized routing
Routing APIs are only needed when you’re using i18n routing.

next-intl integrates with the routing system of Next.js in two places:

Middleware: Negotiates the locale and handles redirects & rewrites (e.g. / → /en)
Navigation APIs: Lightweight wrappers around Next.js’ navigation APIs like <Link />
This enables you to express your app in terms of APIs like <Link href="/about">, while aspects like the locale and user-facing pathnames are automatically handled behind the scenes (e.g. /de/ueber-uns).

Define routing
The routing configuration that is shared between the middleware and the navigation APIs can be defined with the defineRouting function.

src/i18n/routing.ts
import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'de'],
 
  // Used when no locale matches
  defaultLocale: 'en'
});

Depending on your routing needs, you may wish to consider further settings—see below.

Locale prefix
By default, the pathnames of your app will be available under a prefix that matches your directory structure (e.g. /en/about → app/[locale]/about/page.tsx). You can however adapt the routing to optionally remove the prefix or customize it per locale by configuring the localePrefix setting.

Always use a locale prefix (default)
By default, pathnames always start with the locale (e.g. /en/about).

routing.ts
import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // ...
  localePrefix: 'always'
});

Don’t use a locale prefix for the default locale
If you want to use no prefix for the default locale (e.g. /about), you can configure your routing accordingly:

routing.ts
import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // ...
  localePrefix: 'as-needed'
});

Important: For this routing strategy to work as expected, you should additionally adapt your middleware matcher to detect unprefixed pathnames.

Note that if a superfluous locale prefix like /en/about is requested, the middleware will automatically redirect to the unprefixed version /about. This can be helpful in case you’re redirecting from another locale and you want to update a potential cookie value first (e.g. <Link /> relies on this mechanism).

Never use a locale prefix
If you’d like to provide a locale to next-intl, e.g. based on user settings, you can consider setting up next-intl without i18n routing. This way, you don’t need to use the routing integration in the first place.

However, you can also configure the middleware to never show a locale prefix in the URL, which can be helpful in the following cases:

You want to use domain-based routing and have only one locale per domain
You want to use a cookie to determine the locale while enabling static rendering
routing.ts
import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // ...
  localePrefix: 'never'
});

In this case, requests for all locales will be rewritten to have the locale only prefixed internally. You still need to place all your pages inside a [locale] folder for the routes to be able to receive the locale param.

Note that:

If you use this strategy, you should adapt your matcher to detect unprefixed pathnames.
If you don’t use domain-based routing, the cookie is now the source of truth for determining the locale. Make sure that your hosting solution reliably returns the set-cookie header from the middleware (e.g. Vercel and Cloudflare are known to potentially strip this header for cacheable requests).
Alternate links are disabled in this mode since URLs might not be unique per locale. Due to this, consider including these yourself, or set up a sitemap that links localized pages via alternates.
Custom prefixes
If you’d like to customize the user-facing prefix, you can provide a locale-based mapping:

routing.ts
import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  locales: ['en-US', 'de-AT', 'zh'],
  defaultLocale: 'en-US',
  localePrefix: {
    mode: 'always',
    prefixes: {
      'en-US': '/us',
      'de-AT': '/eu/at'
      // (/zh will be used as-is)
    }
  }
});

Note that:

You should adapt your middleware matcher to match the custom prefixes.
Custom prefixes are only visible to the user and rewritten internally to the corresponding locale. Therefore, the [locale] segment corresponds to the locale, not the prefix.
Localized pathnames
Many apps choose to localize pathnames, especially when search engine optimization is relevant, e.g.:

/en/about
/de/ueber-uns
Since you typically want to define these routes only once internally, you can use the next-intl middleware to rewrite such incoming requests to shared pathnames.

routing.ts
import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  locales: ['en', 'de'],
  defaultLocale: 'en',
 
  // The `pathnames` object holds pairs of internal and
  // external paths. Based on the locale, the external
  // paths are rewritten to the shared, internal ones.
  pathnames: {
    // If all locales use the same pathname, a single
    // external path can be used for all locales
    '/': '/',
    '/blog': '/blog',
 
    // If locales use different paths, you can
    // specify each external path per locale
    '/about': {
      en: '/about',
      de: '/ueber-uns'
    },
 
    // Dynamic params are supported via square brackets
    '/news/[articleSlug]-[articleId]': {
      en: '/news/[articleSlug]-[articleId]',
      de: '/neuigkeiten/[articleSlug]-[articleId]'
    },
 
    // Static pathnames that overlap with dynamic segments
    // will be prioritized over the dynamic segment
    '/news/just-in': {
      en: '/news/just-in',
      de: '/neuigkeiten/aktuell'
    },
 
    // Also (optional) catch-all segments are supported
    '/categories/[...slug]': {
      en: '/categories/[...slug]',
      de: '/kategorien/[...slug]'
    }
  }
});

Localized pathnames map to a single internal pathname that is created via the file-system based routing in Next.js. In the example above, /de/ueber-uns will be handled by the page at /[locale]/about/page.tsx.

Domains
If you want to serve your localized content based on different domains, you can provide a list of mappings between domains and locales via the domains setting.

Examples:

us.example.com/en
ca.example.com/en
ca.example.com/fr
routing.ts
import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  domains: [
    {
      domain: 'us.example.com',
      defaultLocale: 'en',
      // Optionally restrict the locales available on this domain
      locales: ['en']
    },
    {
      domain: 'ca.example.com',
      defaultLocale: 'en'
      // If there are no `locales` specified on a domain,
      // all available locales will be supported here
    }
  ]
});

Note that:

You can optionally remove the locale prefix in pathnames by changing the localePrefix setting. E.g. localePrefix: 'never' can be helpful in case you have unique domains per locale.
If no domain matches, the middleware will fall back to the defaultLocale (e.g. on localhost).
Turning off locale detection
The middleware will detect a matching locale based on your routing configuration & the incoming request and will either pass the request through for a matching locale or redirect to one that matches.

If you want to rely entirely on the URL to resolve the locale, you can set the localeDetection property to false. This will disable locale detection based on the accept-language header and a potentially existing cookie value from a previous visit.

routing.ts
import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // ...
  localeDetection: false
});

In this case, only the locale prefix and a potentially matching domain are used to determine the locale.

Locale cookie
By default, the middleware will set a cookie called NEXT_LOCALE that contains the most recently detected locale. This is used to remember the user’s locale preference for future requests.

By default, the cookie will be configured with the following attributes:

maxAge: This value is set to 1 year so that the preference of the user is kept as long as possible.
sameSite: This value is set to lax so that the cookie can be set when coming from an external site.
path: This value is not set by default, but will use the value of your basePath if configured.
If you have more specific requirements, you can adjust these settings accordingly:

routing.ts
import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // ...
 
  // Will be merged with the defaults
  localeCookie: {
    // Custom cookie name
    name: 'USER_LOCALE',
    // Expire in one day
    maxAge: 60 * 60 * 24
  }
});

… or turn the cookie off entirely:

routing.ts
import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // ...
 
  localeCookie: false
});

Note that the cookie is only set when the user switches the locale and is not updated on every request.

Alternate links
The middleware automatically sets the link header to inform search engines that your content is available in different languages. Note that this automatically integrates with your routing strategy and will generate the correct links based on your configuration.

However, there are cases where you may want to provide these links yourself:

You have pages that are only available for certain locales
You’re using an external system like a CMS to manage localized slugs of your pages
In this case, you can opt-out of this behavior by setting alternateLinks to false.

routing.ts
import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // ...
 
  alternateLinks: false
});

If you decide to manage alternate links yourself, a good option can be to include them in a sitemap.

Base path
The next-intl middleware as well as the navigation APIs will automatically pick up a basePath that you might have configured in your next.config.js.

Note however that you should make sure that your middleware matcher handles the root of your base path:

middleware.ts
export const config = {
  // The `matcher` is relative to the `basePath`
  matcher: [
    // This entry handles the root of the base
    // path and should always be included
    '/'
 
    // ... other matcher config
  ]
};

Trailing slash
If you have trailingSlash set to true in your Next.js config, this setting will be taken into account by the middleware and the navigation APIs.

Note that if you’re using localized pathnames, your internal and external pathnames can be defined either with or without a trailing slash as they will be normalized internally.

Last updated on March 4, 2025

Docs
Routing
Middleware
Middleware
The middleware is only needed when you’re using i18n routing.

The middleware receives a routing configuration and takes care of:

Locale negotiation
Applying relevant redirects & rewrites
Providing alternate links for search engines
Example:

middleware.ts
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
export default createMiddleware(routing);
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|en)/:path*']
};

Locale detection
The locale is negotiated based on your localePrefix and domains setting. Once a locale is detected, it will be remembered for future requests by being stored in the NEXT_LOCALE cookie.

Prefix-based routing (default)
By default, prefix-based routing is used to determine the locale of a request.

In this case, the locale is detected based on these priorities:

A locale prefix is present in the pathname (e.g. /en/about)
A cookie is present that contains a previously detected locale
A locale can be matched based on the accept-language header
As a last resort, the defaultLocale is used
To change the locale, users can visit a prefixed route. This will take precedence over a previously matched locale that is saved in a cookie or the accept-language header and will update the previous cookie value.

Example workflow:

A user requests / and based on the accept-language header, the en locale is matched.
The en locale is saved in a cookie and the user is redirected to /en.
The app renders <Link locale="de" href="/">Switch to German</Link> to allow the user to change the locale to de.
When the user clicks on the link, a request to /de is initiated.
The middleware will update the cookie value to de.
Domain-based routing
If you’re using domain-based routing, the middleware will match the request against the available domains to determine the best-matching locale. To retrieve the domain, the host is read from the x-forwarded-host header, with a fallback to host (hosting platforms typically provide these headers out-of-the-box).

The locale is detected based on these priorities:

A locale prefix is present in the pathname (e.g. ca.example.com/fr)
A locale is stored in a cookie and is supported on the domain
A locale that the domain supports is matched based on the accept-language header
As a fallback, the defaultLocale of the domain is used
Since the middleware is aware of all your domains, if a domain receives a request for a locale that is not supported (e.g. en.example.com/fr), it will redirect to an alternative domain that does support the locale.

Example workflow:

The user requests us.example.com and based on the defaultLocale of this domain, the en locale is matched.
The app renders <Link locale="fr" href="/">Switch to French</Link> to allow the user to change the locale to fr.
When the link is clicked, a request to us.example.com/fr is initiated.
The middleware recognizes that the user wants to switch to another domain and responds with a redirect to ca.example.com/fr.
Matcher config
The middleware is intended to only run on pages, not on arbitrary files that you serve independently of the user locale (e.g. /favicon.ico).

Because of this, the following config is generally recommended:

middleware.ts
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|en)/:path*']
};

This enables:

A redirect at / to a suitable locale
Internationalization of all pathnames starting with a locale (e.g. /en/about)
Pathnames without a locale prefix
There are two use cases where you might want to match pathnames without a locale prefix:

You’re using a config for localePrefix other than always
You want to enable redirects that add a locale for unprefixed pathnames (e.g. /about → /en/about)
For these cases, the middleware should run on requests for pathnames without a locale prefix as well.

A popular strategy is to match all routes that don’t start with certain segments (e.g. /_next) and also none that include a dot (.) since these typically indicate static files. However, if you have some routes where a dot is expected (e.g. /users/jane.doe), you should explicitly provide a matcher for these.

middleware.ts
export const config = {
  // Matcher entries are linked with a logical "or", therefore
  // if one of them matches, the middleware will be invoked.
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // However, match all pathnames within `/users`, optionally with a locale prefix
    '/([\\w-]+)?/users/(.+)'
  ]
};

Note that some third-party providers like Vercel Analytics typically use internal endpoints that are then rewritten to an external URL (e.g. /_vercel/insights/view). Make sure to exclude such requests from your middleware matcher so they aren’t rewritten by accident.

Composing other middlewares
By calling createMiddleware, you’ll receive a function of the following type:

function middleware(request: NextRequest): NextResponse;

If you need to incorporate additional behavior, you can either modify the request before the next-intl middleware receives it, modify the response or even create the middleware based on dynamic configuration.

middleware.ts
import createMiddleware from 'next-intl/middleware';
import {NextRequest} from 'next/server';
 
export default async function middleware(request: NextRequest) {
  // Step 1: Use the incoming request (example)
  const defaultLocale = request.headers.get('x-your-custom-locale') || 'en';
 
  // Step 2: Create and call the next-intl middleware (example)
  const handleI18nRouting = createMiddleware({
    locales: ['en', 'de'],
    defaultLocale
  });
  const response = handleI18nRouting(request);
 
  // Step 3: Alter the response (example)
  response.headers.set('x-your-custom-locale', defaultLocale);
 
  return response;
}
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|en)/:path*']
};

Example: Additional rewrites
If you need to handle rewrites apart from the ones provided by next-intl, you can adjust the pathname of the request before invoking the next-intl middleware (based on “A/B Testing with Cookies” by Vercel).

This example rewrites requests for /[locale]/profile to /[locale]/profile/new if a special cookie is set.

middleware.ts
import createMiddleware from 'next-intl/middleware';
import {NextRequest} from 'next/server';
 
export default async function middleware(request: NextRequest) {
  const [, locale, ...segments] = request.nextUrl.pathname.split('/');
 
  if (locale != null && segments.join('/') === 'profile') {
    const usesNewProfile =
      (request.cookies.get('NEW_PROFILE')?.value || 'false') === 'true';
 
    if (usesNewProfile) {
      request.nextUrl.pathname = `/${locale}/profile/new`;
    }
  }
 
  const handleI18nRouting = createMiddleware({
    locales: ['en', 'de'],
    defaultLocale: 'en'
  });
  const response = handleI18nRouting(request);
  return response;
}
 
export const config = {
  matcher: ['/', '/(de|en)/:path*']
};

Note that if you use a localePrefix other than always, you need to adapt the handling appropriately to handle unprefixed pathnames too. Also, make sure to only rewrite pathnames that will not lead to a redirect, as otherwise rewritten pathnames will be redirected to.

Example: Integrating with Clerk
@clerk/nextjs provides a middleware that can be combined with other middlewares like the one provided by next-intl. By combining them, the middleware from @clerk/next will first ensure protected routes are handled appropriately. Subsequently, the middleware from next-intl will run, potentially redirecting or rewriting incoming requests.

middleware.ts
import {clerkMiddleware, createRouteMatcher} from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
const handleI18nRouting = createMiddleware(routing);
 
const isProtectedRoute = createRouteMatcher(['/:locale/dashboard(.*)']);
 
export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
 
  return handleI18nRouting(req);
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|en)/:path*']
};

(based on @clerk/nextjs@^6.0.0)

Example: Integrating with Supabase Authentication
In order to use Supabase Authentication with next-intl, you need to combine the Supabase middleware with the one from next-intl.

You can do so by following the setup guide from Supabase and adapting the middleware utils to accept a response object that’s been created by the next-intl middleware instead of creating a new one:

utils/supabase/middleware.ts
import {createServerClient} from '@supabase/ssr';
import {NextResponse, type NextRequest} from 'next/server';
 
export async function updateSession(
  request: NextRequest,
  response: NextResponse
) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({name, value}) =>
            request.cookies.set(name, value)
          );
          cookiesToSet.forEach(({name, value, options}) =>
            response.cookies.set(name, value, options)
          );
        }
      }
    }
  );
 
  const {
    data: {user}
  } = await supabase.auth.getUser();
 
  return response;
}

Now, we can integrate the Supabase middleware with the one from next-intl:

middleware.ts
import createMiddleware from 'next-intl/middleware';
import {type NextRequest} from 'next/server';
import {routing} from './i18n/routing';
import {updateSession} from './utils/supabase/middleware';
 
const handleI18nRouting = createMiddleware(routing);
 
export async function middleware(request: NextRequest) {
  const response = handleI18nRouting(request);
 
  // A `response` can now be passed here
  return await updateSession(request, response);
}
 
export const config = {
  matcher: ['/', '/(de|en)/:path*']
};

(based on @supabase/ssr@^0.5.0)

Example: Integrating with Auth.js (aka NextAuth.js)
The Next.js middleware of Auth.js requires an integration with their control flow to be compatible with other middlewares. The success callback can be used to run the next-intl middleware on authorized pages. However, public pages need to be treated separately.

For pathnames specified in the pages object (e.g. signIn), Auth.js will skip the entire middleware and not run the success callback. Therefore, we have to detect these pages before running the Auth.js middleware and only run the next-intl middleware in this case.

middleware.ts
import {withAuth} from 'next-auth/middleware';
import createMiddleware from 'next-intl/middleware';
import {NextRequest} from 'next/server';
import {routing} from './i18n/routing';
 
const publicPages = ['/', '/login'];
 
const handleI18nRouting = createMiddleware(routing);
 
const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  function onSuccess(req) {
    return handleI18nRouting(req);
  },
  {
    callbacks: {
      authorized: ({token}) => token != null
    },
    pages: {
      signIn: '/login'
    }
  }
);
 
export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
 
  if (isPublicPage) {
    return handleI18nRouting(req);
  } else {
    return (authMiddleware as any)(req);
  }
}
 
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};

(based on next-auth@^4.0.0)

Have a look at the next-intl with NextAuth.js example to explore a working setup.

Usage without middleware (static export)
If you’re using the static export feature from Next.js (output: 'export'), the middleware will not run. You can use prefix-based routing nontheless to internationalize your app, but a few tradeoffs apply.

Static export limitations:

Using a locale prefix is required (same as localePrefix: 'always')
The locale can’t be negotiated on the server (same as localeDetection: false)
You can’t use pathname localization, as these require server-side rewrites
Static rendering is required
Additionally, other limitations as documented by Next.js will apply too.

If you choose this approach, you might want to enable a redirect at the root of your app:

app/page.tsx
import {redirect} from 'next/navigation';
 
// Redirect the user to the default locale when `/` is requested
export default function RootPage() {
  redirect('/en');
}

Additionally, Next.js will ask for a root layout for app/page.tsx, even if it’s just passing children through:

app/layout.tsx
export default function RootLayout({children}) {
  return children;
}

Troubleshooting
”The middleware doesn’t run for a particular page.”
To resolve this, make sure that:

The middleware is set up in the correct file (e.g. src/middleware.ts).
Your middleware matcher correctly matches all routes of your application, including dynamic segments with potentially unexpected characters like dots (e.g. /users/jane.doe).
In case you’re composing other middlewares, ensure that the middleware is called correctly.
In case you require static rendering, make sure to follow the static rendering guide instead of relying on hacks like force-static.
”My page content isn’t localized despite the pathname containing a locale prefix.”
This is very likely the result of your middleware not running on the request. As a result, a potential fallback from i18n/request.ts might be applied.

”Unable to find next-intl locale because the middleware didn’t run on this request and no locale was returned in getRequestConfig.”
If the middleware is not expected to run on this request (e.g. because you’re using a setup without i18n routing), you should explicitly return a locale from getRequestConfig to recover from this error.

If the middleware is expected to run, verify that your middleware is set up correctly.

Note that next-intl will invoke the notFound() function to abort the render if no locale is available after getRequestConfig has run. You should consider adding a not-found page due to this.

Last updated on 


Docs
Routing
Navigation
Navigation APIs
The navigation APIs are only needed when you’re using i18n routing.

next-intl provides lightweight wrappers around Next.js’ navigation APIs like <Link /> and useRouter that automatically handle the user locale and pathnames behind the scenes.

To create these APIs, you can call the createNavigation function with your routing configuration:

navigation.ts
import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';
 
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);

This function is typically called in a central module like src/i18n/navigation.ts in order to provide easy access to navigation APIs in your components.

APIs
The created navigation APIs are thin wrappers around the equivalents from Next.js and mostly adhere to the same function signatures. Your routing configuration and the user’s locale are automatically incorporated.

If you’re using the pathnames setting in your routing configuration, the internal pathnames that are accepted for href arguments will be strictly typed and localized to the given locale.

Link
This component wraps next/link and localizes the pathname as necessary.

import {Link} from '@/i18n/navigation';
 
// When the user is on `/en`, the link will point to `/en/about`
<Link href="/about">About</Link>
 
// Search params can be added via `query`
<Link href={{pathname: "/users", query: {sortBy: 'name'}}}>Users</Link>
 
// You can override the `locale` to switch to another language
// (this will set the `hreflang` attribute on the anchor tag)
<Link href="/" locale="de">Switch to German</Link>

Depending on if you’re using the pathnames setting, dynamic params can either be passed as:

// 1. A final string (when not using `pathnames`)
<Link href="/users/12">Susan</Link>
 
// 2. An object (when using `pathnames`)
<Link href={{
  pathname: '/users/[userId]',
  params: {userId: '5'}
}}>
  Susan
</Link>

useRouter
If you need to navigate programmatically, e.g. in an event handler, next-intl provides a convience API that wraps useRouter from Next.js and localizes the pathname accordingly.

'use client';
 
import {useRouter} from '@/i18n/navigation';
 
const router = useRouter();
 
// When the user is on `/en`, the router will navigate to `/en/about`
router.push('/about');
 
// Search params can be added via `query`
router.push({
  pathname: '/users',
  query: {sortBy: 'name'}
});
 
// You can override the `locale` to switch to another language
router.replace('/about', {locale: 'de'});

Depending on if you’re using the pathnames setting, dynamic params can either be passed as:

// 1. A final string (when not using `pathnames`)
router.push('/users/12');
 
// 2. An object (when using `pathnames`)
router.push({
  pathname: '/users/[userId]',
  params: {userId: '5'}
});

usePathname
To retrieve the current pathname without a potential locale prefix, you can call usePathname.

'use client';
 
import {usePathname} from '@/i18n/navigation';
 
// When the user is on `/en`, this will be `/`
const pathname = usePathname();

Note that if you’re using the pathnames setting, the returned pathname will correspond to an internal pathname template (dynamic params will not be replaced by their values).

// When the user is on `/de/ueber-uns`, this will be `/about`
const pathname = usePathname();
 
// When the user is on `/de/neuigkeiten/produktneuheit-94812`,
// this will be `/news/[articleSlug]-[articleId]`
const pathname = usePathname();

redirect
If you want to interrupt the render and redirect to another page, you can invoke the redirect function. This wraps the redirect function from Next.js and localizes the pathname as necessary.

Note that a locale prop is always required, even if you’re just passing the current locale.

import {redirect} from '@/i18n/navigation';
 
// Redirects to `/en/login`
redirect({href: '/login', locale: 'en'});
 
// Search params can be added via `query`
redirect({href: '/users', query: {sortBy: 'name'}, locale: 'en'});

Depending on if you’re using the pathnames setting, dynamic params can either be passed as:

// 1. A final string (when not using `pathnames`)
redirect({href: '/users/12', locale: 'en'});
 
// 2. An object (when using `pathnames`)
redirect({
  href: {
    pathname: '/users/[userId]',
    params: {userId: '5'}
  },
  locale: 'en'
});

permanentRedirect is supported too.

getPathname
If you need to construct a particular pathname based on a locale, you can call the getPathname function. This can for example be useful to retrieve a canonical link for a page that accepts search params.

import {getPathname} from '@/i18n/navigation';
 
// Will return `/en/about`
const pathname = getPathname({
  locale: 'en',
  href: '/about'
});
 
// Search params can be added via `query`
const pathname = getPathname({
  locale: 'en',
  href: {
    pathname: '/users',
    params: {sortBy: 'name'}
  }
});

Depending on if you’re using the pathnames setting, dynamic params can either be passed as:

// 1. A final string (when not using `pathnames`)
const pathname = getPathname({
  locale: 'en',
  href: '/users/12'
});
 
// 2. An object (when using `pathnames`)
const pathname = getPathname({
  locale: 'en',
  href: {
    pathname: '/users/[userId]',
    params: {userId: '5'}
  }
});

Legacy APIs
next-intl@3.0.0 brought the first release of the navigation APIs with these functions:

createSharedPathnamesNavigation
createLocalizedPathnamesNavigation
As part of next-intl@3.22.0, these functions have been replaced by a single createNavigation function, which unifies the API for both use cases and also fixes a few quirks in the previous APIs. Going forward, createNavigation is recommended and the previous functions are marked as deprecated.

While createNavigation is mostly API-compatible, there are some minor differences that should be noted. Please refer to the 3.22 announcement post for full details.

Last updated on February 27, 2025



Internationalization of Server & Client Components
React Server Components allow you to implement components that remain server-side only if they don’t require React’s interactive features, such as useState and useEffect.

This applies to handling internationalization too.

page.tsx
import {useTranslations} from 'next-intl';
 
// Since this component doesn't use any interactive features
// from React, it can be run as a Server Component.
 
export default function HomePage() {
  const t = useTranslations('HomePage');
  return <h1>{t('title')}</h1>;
}

Moving internationalization to the server side unlocks new levels of performance, leaving the client side for interactive features.

Benefits of server-side internationalization:

Your messages never leave the server and don’t need to be passed to the client side
Library code for internationalization doesn’t need to be loaded on the client side
No need to split your messages, e.g. based on routes or components
No runtime cost on the client side
Using internationalization in Server Components
Server Components can be declared in two ways:

Async components
Non-async, regular components
In a typical app, you’ll likely find both types of components. next-intl provides corresponding APIs that work for the given component type.

Async components
These are primarly concerned with fetching data and can not use hooks. Due to this, next-intl provides a set of awaitable versions of the functions that you usually call as hooks from within components.

page.tsx
import {getTranslations} from 'next-intl/server';
 
export default async function ProfilePage() {
  const user = await fetchUser();
  const t = await getTranslations('ProfilePage');
 
  return (
    <PageLayout title={t('title', {username: user.name})}>
      <UserDetails user={user} />
    </PageLayout>
  );
}

These functions are available:

getTranslations
getFormatter
getNow
getTimeZone
getMessages
getLocale
Non-async components
Components that aren’t declared with the async keyword and don’t use interactive features like useState, are referred to as shared components. These can render either as a Server or Client Component, depending on where they are imported from.

In Next.js, Server Components are the default, and therefore shared components will typically execute as Server Components.

UserDetails.tsx
import {useTranslations} from 'next-intl';
 
export default function UserDetails({user}) {
  const t = useTranslations('UserProfile');
 
  return (
    <section>
      <h2>{t('title')}</h2>
      <p>{t('followers', {count: user.numFollowers})}</p>
    </section>
  );
}

If you import useTranslations, useFormatter, useLocale, useNow and useTimeZone from a shared component, next-intl will automatically provide an implementation that works best for the environment this component executes in (server or client).

Using internationalization in Client Components
Depending on your situation, you may need to handle internationalization in Client Components. While providing all messages to the client side is typically the easiest way to get started and a reasonable approach for many apps, you can be more selective about which messages are passed to the client side if you’re interested in optimizing the performance of your app.

There are several options for using translations from next-intl in Client Components, listed here in order of enabling the best performance:

Option 1: Passing translations to Client Components
The preferred approach is to pass the processed labels as props or children from a Server Component.

FAQEntry.tsx
import {useTranslations} from 'next-intl';
import Expandable from './Expandable'; // A Client Component
import FAQContent from './FAQContent';
 
export default function FAQEntry() {
  // Call `useTranslations` in a Server Component ...
  const t = useTranslations('FAQEntry');
 
  // ... and pass translated content to a Client Component
  return (
    <Expandable title={t('title')}>
      <FAQContent content={t('description')} />
    </Expandable>
  );
}

Expandable.tsx
'use client';
 
import {useState} from 'react';
 
function Expandable({title, children}) {
  const [expanded, setExpanded] = useState(false);
 
  function onToggle() {
    setExpanded(!expanded);
  }
 
  return (
    <div>
      <button onClick={onToggle}>{title}</button>
      {expanded && <div>{children}</div>}
    </div>
  );
}

By doing this, we can use interactive features from React like useState on translated content, even though the translation only runs on the server side.

Learn more in the Next.js docs: Passing Server Components to Client Components as Props

Option 2: Moving state to the server side
You might run into cases where you have dynamic state, such as pagination, that should be reflected in translated messages.

Pagination.tsx
function Pagination({curPage, totalPages}) {
  const t = useTranslations('Pagination');
  return <p>{t('info', {curPage, totalPages})}</p>;
}

You can still manage your translations on the server side by using:

Page or search params
Cookies
Database state
In particular, page and search params are often a great option because they offer additional benefits such as preserving the state of the app when the URL is shared, as well as integration with the browser history.

There’s an article on Smashing Magazine about using next-intl in Server Components which explores the usage of search params through a real-world example (specifically the section about adding interactivity).

Option 3: Providing individual messages
To reduce bundle size, next-intl doesn’t automatically provide messages or formats to Client Components.

If you need to incorporate dynamic state into components that can not be moved to the server side, you can wrap these components with NextIntlClientProvider and provide the relevant messages.

Counter.tsx
import pick from 'lodash/pick';
import {NextIntlClientProvider, useMessages} from 'next-intl';
import ClientCounter from './ClientCounter';
 
export default function Counter() {
  // Receive messages provided in `i18n/request.ts` …
  const messages = useMessages();
 
  return (
    <NextIntlClientProvider
      messages={
        // … and provide the relevant messages
        pick(messages, 'ClientCounter')
      }
    >
      <ClientCounter />
    </NextIntlClientProvider>
  );
}

Option 4: Providing all messages
If you’re building a highly dynamic app where most components use React’s interactive features, you may prefer to make all messages available to Client Components.

layout.tsx
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
 
export default async function RootLayout(/* ... */) {
  // Receive messages provided in `i18n/request.ts`
  const messages = await getMessages();
 
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

Troubleshooting
”Failed to call useTranslations because the context from NextIntlClientProvider was not found.”
You might encounter this error or a similar one referencing useFormatter while working on your app.

This can happen because:

You’re intentionally calling the hook from a Client Component, but NextIntlClientProvider is not present as an ancestor in the component tree. If this is the case, you can wrap your component in NextIntlClientProvider to resolve this error.
The component that calls the hook accidentally ended up in a client-side module graph, but you expected it to render as a Server Component. If this is the case, try to pass this component via children to the Client Component instead.
”Functions cannot be passed directly to Client Components because they’re not serializable.”
You might encounter this error when you try to pass a non-serializable prop to NextIntlClientProvider.

The component accepts the following props that are not serializable:

onError
getMessageFallback
Rich text elements for defaultTranslationValues
To configure these, you can wrap NextIntlClientProvider with another component that is marked with 'use client' and defines the relevant props.

See: How can I provide non-serializable props like onError to NextIntlClientProvider?

Last updated on October 23, 2024


Server Actions, Metadata & Route Handlers
There are a few places in Next.js apps where you can apply internationalization outside of React components:

Metadata API
Server Actions
Open Graph images
Manifest
Sitemap
Route Handlers
next-intl/server provides a set of awaitable functions that can be used in these cases.

Metadata API
To internationalize metadata like the page title, you can use functionality from next-intl in the generateMetadata function that can be exported from pages and layouts.

layout.tsx
import {getTranslations} from 'next-intl/server';
 
export async function generateMetadata({params}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Metadata'});
 
  return {
    title: t('title')
  };
}

By passing an explicit locale to the awaitable functions from next-intl, you can make the metadata handler eligible for static rendering if you’re using i18n routing.

Server Actions
Server Actions provide a mechanism to execute server-side code that is invoked by the client. In case you’re returning user-facing messages, you can use next-intl to localize them based on the user’s locale.

import {getTranslations} from 'next-intl/server';
 
async function loginAction(data: FormData) {
  'use server';
 
  const t = await getTranslations('LoginForm');
  const areCredentialsValid = /* ... */;
  if (!areCredentialsValid) {
    return {error: t('invalidCredentials')};
  }
}

Note that when you’re displaying messages generated in Server Actions to the user, you should consider the case if the user can switch the locale while the message is displayed to ensure that the UI is localized consistently. If you’re using a [locale] segment as part of your routing strategy then this is handled automatically. If you’re not, you might want to clear the message manually, e.g. by resetting the state of the respective component via key={locale}.

Open Graph images
If you’re programmatically generating Open Graph images, you can call functions from next-intl in the exported component:

app/[locale]/opengraph-image.tsx
import {ImageResponse} from 'next/og';
import {getTranslations} from 'next-intl/server';
 
export default async function OpenGraphImage({params}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'OpenGraphImage'});
  return new ImageResponse(<div style={{fontSize: 128}}>{t('title')}</div>);
}

Next.js will create a public route based on the segment where opengraph-image.tsx is placed, e.g.:

http://localhost:3000/en/opengraph-image?f87b2d56cee109c7

However, if you’re using i18n routing and you’ve customized the localePrefix setting, this route might not be accessible since Next.js doesn’t know about potential rewrites of the middleware.

If this applies to your app, you can adapt your matcher to bypass requests to the opengraph-image.tsx file:

middleware.ts
// ...
 
export const config = {
  matcher: [
    // Skip all paths that should not be internationalized
    '/((?!api|_next|_vercel|.*/opengraph-image|.*\\..*).*)'
 
    // ...
  ]
};

Manifest
Since the manifest file needs to be placed in the root of the app folder (outside the [locale] dynamic segment), you need to provide a locale explicitly since next-intl can’t infer it from the pathname:

app/manifest.ts
import {MetadataRoute} from 'next';
import {getTranslations} from 'next-intl/server';
 
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  // Pick a locale that is representative of the app
  const locale = 'en';
 
  const t = await getTranslations({
    namespace: 'Manifest',
    locale
  });
 
  return {
    name: t('name'),
    start_url: '/',
    theme_color: '#101E33'
  };
}

Sitemap
If you’re using a sitemap to inform search engines about all pages of your site, you can attach locale-specific alternate entries to every URL in the sitemap to indicate that a particular page is available in multiple languages or regions.

Note that by default, next-intl returns the link response header to instruct search engines that a page is available in multiple languages. While this sufficiently links localized pages for search engines, you may choose to provide this information in a sitemap in case you have more specific requirements.

Next.js supports providing alternate URLs per language via the alternates entry. You can construct a list of entries for each pathname and locale as follows:

app/sitemap.ts
import {MetadataRoute} from 'next';
import {routing, getPathname} from '@/i18n/routing';
 
// Adapt this as necessary
const host = 'https://acme.com';
 
export default function sitemap(): MetadataRoute.Sitemap {
  // Adapt this as necessary
  return [...getEntries('/'), ...getEntries('/users')];
}
 
type Href = Parameters<typeof getPathname>[0]['href'];
 
function getEntries(href: Href) {
  return routing.locales.map((locale) => ({
    url: getUrl(href, locale),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((cur) => [cur, getUrl(href, cur)])
      )
    }
  }));
}
 
function getUrl(href: Href, locale: (typeof routing.locales)[number]) {
  const pathname = getPathname({locale, href});
  return host + pathname;
}

Depending on if you’re using the pathnames setting, dynamic params can either be passed as:

// 1. A final string (when not using `pathnames`)
getEntries('/users/1');
 
// 2. An object (when using `pathnames`)
getEntries({
  pathname: '/users/[id]',
  params: {id: '1'}
});

Keep in mind:

Each pathname should have a separate entry for every locale that your app supports.
Also the locale of a given pathname should be included in the alternates object.
(working implementation)

Route Handlers
You can use next-intl in Route Handlers too. The locale can either be received from a search param, a layout segment or by parsing the accept-language header of the request.

app/api/hello/route.tsx
import {NextResponse} from 'next/server';
import {getTranslations} from 'next-intl/server';
 
export async function GET(request) {
  // Example: Receive the `locale` via a search param
  const {searchParams} = new URL(request.url);
  const locale = searchParams.get('locale');
 
  const t = await getTranslations({locale, namespace: 'Hello'});
  return NextResponse.json({title: t('title')});
}

Last updated on February 27, 2025

Internationalization in Next.js error files
The Next.js App Router’s file convention provides two files that can be used for error handling:

not-found.js
error.js
This page provides practical guides for these cases.

Tip: You can have a look at the App Router example to explore a working app with error handling.

not-found.js
This section is only relevant if you’re using i18n routing.

Next.js renders the closest not-found page when a route segment calls the notFound function. We can use this mechanism to provide a localized 404 page by adding a not-found file within the [locale] folder.

app/[locale]/not-found.tsx
import {useTranslations} from 'next-intl';
 
export default function NotFoundPage() {
  const t = useTranslations('NotFoundPage');
  return <h1>{t('title')}</h1>;
}

Note however that Next.js will only render this page when the notFound function is called from within a route, not for all unknown routes in general.

Catching unknown routes
To catch unknown routes too, you can define a catch-all route that explicitly calls the notFound function.

app/[locale]/[...rest]/page.tsx
import {notFound} from 'next/navigation';
 
export default function CatchAllPage() {
  notFound();
}

After this change, all requests that are matched within the [locale] segment will render the not-found page when an unknown route is encountered (e.g. /en/unknown).

Catching non-localized requests
When the user requests a route that is not matched by the next-intl middleware, there’s no locale associated with the request (depending on your matcher config, e.g. /unknown.txt might not be matched).

You can add a root not-found page to handle these cases too.

app/not-found.tsx
'use client';
 
import Error from 'next/error';
 
export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <Error statusCode={404} />
      </body>
    </html>
  );
}

Note that the presence of app/not-found.tsx requires that a root layout is available, even if it’s just passing children through.

app/layout.tsx
// Since we have a root `not-found.tsx` page, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({children}) {
  return children;
}

For the 404 page to render, we need to call the notFound function in the root layout when we detect an incoming locale param that isn’t a valid locale.

app/[locale]/layout.tsx
import {notFound} from 'next/navigation';
 
export default async function LocaleLayout({children, params}) {
  const {locale} = await params;
 
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
 
  // ...
}

error.js
When an error file is defined, Next.js creates an error boundary within your layout that wraps pages accordingly to catch runtime errors:

<RootLayout>
  <ErrorBoundary fallback={<Error />}>
    <Page />
  </ErrorBoundary>
</RootLayout>

Schematic component hierarchy that Next.js creates internally.

Since the error file must be defined as a Client Component, you have to use NextIntlClientProvider to provide messages in case the error file renders.

layout.tsx
import pick from 'lodash/pick';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
 
export default async function RootLayout(/* ... */) {
  const messages = await getMessages();
 
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider
          locale={locale}
          // Make sure to provide at least the messages for `Error`
          messages={pick(messages, 'Error')}
        >
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

Once NextIntlClientProvider is in place, you can use functionality from next-intl in the error file:

error.tsx
'use client';
 
import {useTranslations} from 'next-intl';
 
export default function Error({error, reset}) {
  const t = useTranslations('Error');
 
  return (
    <div>
      <h1>{t('title')}</h1>
      <button onClick={reset}>{t('retry')}</button>
    </div>
  );
}

Note that error.tsx is loaded right after your app has initialized. If your app is performance-sensitive and you want to avoid loading translation functionality from next-intl as part of this bundle, you can export a lazy reference from your error file:

error.tsx
'use client';
 
import {lazy} from 'react';
 
// Move error content to a separate chunk and load it only when needed
export default lazy(() => import('./Error'));

Last updated on February 27, 2025


Markdown (MDX)
Especially for sites where the content varies significantly by locale and may require a different structure, it can be helpful to use Markdown or MDX to provide your localized content. To consume this content in a Next.js app, you can use the @next/mdx package, which allows you to import and render MDX content.

While you can create entire pages using page.mdx files, in an app that uses the [locale] segment, it can be beneficial to import localized MDX content based on the user’s locale into a single page.tsx file.

After following the setup instructions for @next/mdx, you can consider placing your localized MDX files next to a page that will render them:

src
└── app
    └── [locale]
        ├── page.tsx
        ├── en.mdx
        └── de.mdx

Now, in page.tsx, you can import the MDX content based on the user’s locale:

src/app/[locale]/page.tsx
import {notFound} from 'next/navigation';
 
export default async function HomePage({params}) {
  const {locale} = await params;
 
  try {
    const Content = (await import(`./${locale}.mdx`)).default;
    return <Content />;
  } catch (error) {
    notFound();
  }
}

In this example, an MDX file might look like this:

src/app/[locale]/en.mdx
import Portrait from '@/components/Portrait';
 
# Home
 
Welcome to my site!
 
<Portrait />

Components that invoke hooks from next-intl like useTranslations can naturally be used in MDX content and will respect the user’s locale.

Not at all! The built in message formatting of next-intl supports rich text syntax, which can be used to provide formatting, and to embed React components within messages.

MDX is best suited for cases where content varies significantly by locale. If all you’re looking for is rich text formatting, the built-in message formatting may be an easier choice.

Especially if you’d like to allow translators to collaborate on MDX files, you can consider uploading them to a translation management system like Crowdin.

In this case, you can fetch the MDX content dynamically from within a page and parse it using a package like next-mdx-remote.

Note that MDX compiles to JavaScript and is dynamically evaluated. You should be sure to only load MDX content from a trusted source, otherwise this can lead to arbitrary code execution.

Core library
While next-intl is primarily intended to be used in Next.js apps, the core is agnostic and can be used independently either in React apps or any other JavaScript environment.

React apps
next-intl internally uses a library called use-intl. This core library contains most features you’re familiar with from next-intl, but lacks the following Next.js-specific features:

Routing APIs
Awaitable APIs for Server Actions, Metadata and Route Handlers
Server Components integration along with i18n/request.ts
In case Server Components establish themselves in React apps outside of Next.js, the support for Server Components might be moved to the core library in the future.

In contrast, use-intl contains all APIs that are necessary for handling i18n in regular React apps:

useTranslations for translating messages
useFormatter for formatting numbers, dates & times and lists
Configuration APIs (note however that NextIntlProvider is called IntlProvider in use-intl)
This allows you to use the same APIs that you know from next-intl in other environments:

React Apps (example)
React Native (example)
Remix (example)
Testing environments like Jest (example)
Storybook
Basic usage:

import {IntlProvider, useTranslations} from 'use-intl';
 
// You can get the messages from anywhere you like. You can also
// fetch them from within a component and then render the provider
// along with your app once you have the messages.
const messages = {
  App: {
    hello: 'Hello {username}!'
  }
};
 
function Root() {
  return (
    <IntlProvider messages={messages} locale="en">
      <App user={{name: 'Jane'}} />
    </IntlProvider>
  );
}
 
function App({user}) {
  const t = useTranslations('App');
  return <h1>{t('hello', {username: user.name})}</h1>;
}

Since next-intl uses use-intl internally, you can even build shared components based on use-intl that can be used in both Next.js and non-Next.js apps.

Non-React apps
Besides the React-specific APIs, use-intl also exports two low-level functions that can be used in any JavaScript environment:

createTranslator for translating messages
createFormatter for formatting numbers, dates & times and lists
These APIs receive all relevant configuration directly and don’t rely on global configuration.

You can use these APIs as follows:

import {createTranslator, createFormatter} from 'use-intl/core';
 
const messages = {
  basic: 'Hello {name}!',
  rich: 'Hello <b>{name}</b>!'
};
 
// This creates the same function that is returned by `useTranslations`.
// Since there's no provider, you can pass all the properties you'd
// usually pass to the provider directly here.
const t = createTranslator({locale: 'en', messages});
 
// Result: "Hello world!"
t('basic', {name: 'world'});
 
// To generate HTML markup, you can consider using the `markup`
// function which in contrast to `t.rich` returns a markup string.
t.markup('rich', {
  name: 'world',
  b: (chunks) => `<b>${chunks}</b>`
});
 
// Creates the same object that is returned by `useFormatter`.
const format = createFormatter({locale: 'en'});
 
// Result: "Oct 17, 2022"
format.dateTime(new Date(2022, 9, 17), {dateStyle: 'medium'});

Last updated on October 23, 202


Runtime requirements
Browser
The source code of next-intl is compiled for the same browsers that Next.js supports.

Based on the features you’re using, you have to make sure your target browsers support the following APIs:

Basic usage: Intl.Locale (compatibility)
Date & time formatting: Intl.DateTimeFormat (compatibility)
Number formatting: Intl.NumberFormat (compatibility)
Pluralization: Intl.PluralRules (compatibility)
Relative time formatting: Intl.RelativeTimeFormat (compatibility)
List formatting: Intl.ListFormat (compatibility)
If you target a browser that doesn’t support all the required APIs, consider using polyfills.

Cloudflare provides a polyfill service that you can use to load the necessary polyfills for a given locale.

Example:

IntlPolyfills.tsx
import {useLocale} from 'next-intl';
import Script from 'next/script';
 
function IntlPolyfills() {
  const locale = useLocale();
 
  const polyfills = [
    'Intl',
    'Intl.Locale',
    'Intl.DateTimeFormat',
    `Intl.DateTimeFormat.~locale.${locale}`,
    `Intl.NumberFormat`,
    `Intl.NumberFormat.~locale.${locale}`,
    'Intl.PluralRules',
    `Intl.PluralRules.~locale.${locale}`,
    'Intl.RelativeTimeFormat',
    `Intl.RelativeTimeFormat.~locale.${locale}`,
    'Intl.ListFormat',
    `Intl.ListFormat.~locale.${locale}`
  ];
 
  return (
    <Script
      strategy="beforeInteractive"
      src={
        'https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js?features=' +
        polyfills.join(',')
      }
    />
  );
}

Note that the polyfill service doesn’t support every locale. You can find a list of the available polyfills in the polyfill-service repository (e.g. search for Intl.DateTimeFormat.~locale.de-AT).

Node.js
The minimum version to support all relevant Intl APIs is Node.js 13. Starting from this version, all required APIs are available.

TypeScript integration
next-intl integrates seamlessly with TypeScript right out of the box, requiring no additional setup.

However, you can optionally provide supplemental type definitions for your messages and formats to enable autocompletion and improve type safety.

Messages
Messages can be strictly typed to ensure you’re using valid keys.

messages.json
{
  "About": {
    "title": "Hello"
  }
}

function About() {
  // ✅ Valid namespace
  const t = useTranslations('About');
 
  // ✖️ Unknown message key
  t('description');
 
  // ✅ Valid message key
  t('title');
}

To enable this validation, add a global type definition file in your project root (e.g. global.d.ts):

global.d.ts
import en from './messages/en.json';
 
type Messages = typeof en;
 
declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}

You can freely define the interface, but if you have your messages available locally, it can be helpful to automatically create the interface based on the messages from your default locale by importing it.

Formats
Global formats that are referenced in calls like format.dateTime can be strictly typed to ensure you’re using valid format names across your app.

function Component() {
  const format = useFormatter();
 
  // ✅ Valid format
  format.number(2, 'precise');
 
  // ✅ Valid format
  format.list(['HTML', 'CSS', 'JavaScript'], 'enumeration');
 
  // ✖️ Unknown format string
  format.dateTime(new Date(), 'unknown');
 
  // ✅ Valid format
  format.dateTime(new Date(), 'short');
}

To enable this validation, export the formats that you’re using in your request configuration:

i18n/request.ts
import {Formats} from 'next-intl';
 
export const formats = {
  dateTime: {
    short: {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }
  },
  number: {
    precise: {
      maximumFractionDigits: 5
    }
  },
  list: {
    enumeration: {
      style: 'long',
      type: 'conjunction'
    }
  }
} satisfies Formats;
 
// ...

Now, a global type definition file in the root of your project can pick up the shape of your formats and use them for declaring the IntlFormats interface:

global.d.ts
import {formats} from './src/i18n/request';
 
type Formats = typeof formats;
 
declare global {
  // Use type safe formats with `next-intl`
  interface IntlFormats extends Formats {}
}

Troubleshooting
If you’re encountering problems, double check that:

Your interface uses the correct name.
You’re using TypeScript version 5 or later.
You’re using correct paths for all modules you’re importing into your global declaration file.
Your type declaration file is included in tsconfig.json.
Your editor has loaded the most recent type declarations. When in doubt, you can restart.
Last updated on November 13, 2024

Localization management with Crowdin
Once you’ve set up your app with next-intl, you’ll have multiple translation bundles that contain your messages (e.g. en.json). To streamline the workflow of managing these and to allow other team members to contribute translations, it’s a good idea to use a localization management platform.

While next-intl works with all localization management platforms that support translating JSON files, next-intl recommends Crowdin for managing your translations.

Collaborate with translators
The Crowdin Editor provides an easy-to-use environment for translating messages. Apart from guiding translators through your messages, the workflow is improved with advanced features like machine translation suggestions, glossaries and contextual screenshots.

Crowdin Editor
The Crowdin Editor enables translators to work with JSON files from next-intl (illustration).

Decouple localization from development
As a developer-focused localization service, Crowdin helps you to decouple the localization process from development and integrates with your existing workflows.

Integration options:

Git integration e.g. via the GitHub app or the Crowdin CLI (recommended)
Automatic workflows triggered from webhooks
Over-the-air delivery via the JS SDK
Manual up- and download of messages (useful to get started)
Crowdin workflow
The Crowdin GitHub integration automatically creates pull requests when translations are updated.

The TypeScript integration of next-intl can help you to validate at compile time that your app is in sync with your translation bundles.

You can further simplify the process for translators by setting up Crowdin In-Context, allowing for the translation of messages directly from your app.

Example workflow with the GitHub integration
For this example, we’re going to use an example that is publicly available on GitHub: Street Photography Viewer. It’s a Next.js app that displays street photography pictures from Unsplash and uses next-intl for all internationalization needs.

Once you have a GitHub repository with your app, you can follow these steps:

Install the GitHub app from the Crowdin store
Follow the setup guide for the GitHub integration
After this procedure, Crowdin will commit a configuration file to your repository based on your settings.

crowdin.yml
files:
  - source: /messages/en.json
    translation: /messages/%locale%.json

This file provides the local translations in your repository to Crowdin.

Crowdin repository mapping
With the configuration file in place, Crowdin knows about the translation files in your repository.

Now, as soon as a translation gets updated in Crowdin, the next sync will create a pull request in your repository with the updates.

Crowdin repository sync
Automatic translation sync from Crowdin (example pull request)

→ Head over to Crowdin to learn more.

Last updated on October 23, 2024


ESLint
To ensure correct usage of next-intl, you can use ESLint to enforce certain rules.

Avoid hardcoded labels in component markup
The react/jsx-no-literals rule from eslint-plugin-react can be helpful with spotting hardcoded labels in component markup. This can be especially helpful when migrating a project to next-intl, if you want to make sure that all labels have been extracted.

eslint.config.js
// ...
 
  rules: {
    // Avoid hardcoded labels
    'react/jsx-no-literals': 'error'
  }

Be careful though that this doesn’t catch hardcoded attributes (e.g. aria-label="Open menu").

Consistent usage of navigation APIs
If you are using i18n routing, you might want to ensure that developers consistently use the navigation APIs that you’ve configured in your project.

In this example, developers will be prompted to import from @/i18n/routing when they try to import navigation APIs from Next.js.

eslint.config.js
// ...
 
  rules: {
    // Consistently import navigation APIs from `@/i18n/routing`
    'no-restricted-imports': [
      'error',
      {
        name: 'next/link',
        message: 'Please import from `@/i18n/routing` instead.'
      },
      {
        name: 'next/navigation',
        importNames: ['redirect', 'permanentRedirect', 'useRouter', 'usePathname'],
        message: 'Please import from `@/i18n/routing` instead.'
      }
    ]
  }

Last updated on October 23, 2024

