import { FrontmatterBlock } from '@myst-theme/frontmatter';
import { getMetaTagsForArticle } from '@myst-theme/site';
import { ProjectPageCatchBoundary, useNavigationHeight } from '@myst-theme/site';
import { ArticleAndNavigation, NavigationAndFooter } from '../components/Page';
import { TabStateProvider, UiStateProvider } from '@myst-theme/providers';
import { MySTRenderer } from 'myst-demo';
import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = (args) => {
  return getMetaTagsForArticle({
    origin: '',
    url: args.location.pathname,
    title: 'MyST Markdown Sandbox',
    description: 'Try MyST Markdown directly in your browser.',
  });
};

const value = `---
title: Working with MyST Markdown
subtitle: A live demo
authors:
  - name: Rowan Cockett
    orcid: 0000-0002-7859-8394
    affiliations:
      - Executable Books
license: CC-BY-4.0
---

MyST makes Markdown more _extensible_ & **powerful** to support an
ecosystem of tools for computational narratives, technical documentation,
and open scientific communication. You can **edit this demo** including the [frontmatter][myst-frontmatter] to change the title!!

:::{admonition} Our Values
We believe in a community-driven approach of open-source tools that are
composable and extensible. You can find out how to be involved in developing MyST Markdown by getting involved in the [ExecutableBooks][executable-books] project.
:::

MyST allows you to create figures with rich cross-references, scientific citations, and export to many commonly used document formats, including ([websites like this one][websites], [PDFs & $\\LaTeX$][latex], [Microsoft Word][word], and [JATS XML][jats]).

For example, we have included a figure below ([](#my-fig)), [](#example-table) as well as [](#maxwell), a cross-reference to Maxwell's equations.
You can click on these and see the preview of the reference immediately.

## Including Figures and Images

:::{figure} https://source.unsplash.com/random/400x200?beach,ocean
:name: my-fig
:alt: Random image of the beach or ocean!

Relaxing at the beach 🏝 🌊 😎
:::

## Including Math and Equations

\`\`\`{math}
:label: maxwell
\\begin{aligned}
\\nabla \\times \\vec{e}+\\frac{\\partial \\vec{b}}{\\partial t}&=0 \\\\
\\nabla \\times \\vec{h}-\\vec{j}&=\\vec{s}\\_{e}
\\end{aligned}
\`\`\`

## Including Tables

:::{list-table} This is a nice table!
:header-rows: 1
:name: example-table

* - Training
  - Validation
* - 0
  - 5
* - 13720
  - 2744
:::

## Callouts

:::{note}
:class: dropdown
This is initially hidden, and can be clicked to be opened when you are viewing the content.
:::

% These are some links used above to keep things clean!
[myst-frontmatter]: https://myst.tools/docs/mystjs/frontmatter
[executable-books]: https://executablebooks.org/
[latex]: https://myst.tools/docs/mystjs/creating-pdf-documents
[websites]: https://myst.tools/docs/mystjs/website-overview
[word]: https://myst.tools/docs/mystjs/creating-word-documents
[jats]: https://myst.tools/docs/mystjs/creating-jats-xml
`;

export default function ContentPage() {
  const { ref, height } = useNavigationHeight();
  return (
    <NavigationAndFooter tightFooter>
      <TabStateProvider>
        <UiStateProvider>
          <main ref={ref} className="article p-0">
            <MySTRenderer
              value={value}
              column
              fullscreen
              captureTab
              className="h-[calc(100vh-60px)]"
              TitleBlock={FrontmatterBlock}
            />
          </main>
        </UiStateProvider>
      </TabStateProvider>
    </NavigationAndFooter>
  );
}

export function CatchBoundary() {
  return (
    <ArticleAndNavigation>
      <main className="article-content">
        <ProjectPageCatchBoundary />
      </main>
    </ArticleAndNavigation>
  );
}
