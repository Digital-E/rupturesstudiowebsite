import Prismic from "prismic-javascript";

const REPOSITORY = process.env.PRISMIC_REPOSITORY_NAME;
const REF_API_URL = `https://${REPOSITORY}.prismic.io/api/v2`;
const GRAPHQL_API_URL = `https://${REPOSITORY}.prismic.io/graphql`;
// export const API_URL = 'https://your-repo-name.cdn.prismic.io/api/v2'
export const API_TOKEN = process.env.PRISMIC_API_TOKEN;
export const API_LOCALE = process.env.PRISMIC_REPOSITORY_LOCALE;

export const PrismicClient = Prismic.client(REF_API_URL, {
  // accessToken: API_TOKEN,
});

async function fetchAPI(query, { previewData, variables } = {}) {

  const prismicAPI = await PrismicClient.getApi();
  const res = await fetch(
    `${GRAPHQL_API_URL}?query=${query}&variables=${JSON.stringify(variables)}`,
    {
      headers: {
        "Prismic-Ref": previewData?.ref || prismicAPI.masterRef.ref,
        "Content-Type": "application/json",
        // "Accept-Language": API_LOCALE,
        // Authorization: `Token ${API_TOKEN}`,
      },
    }
  );

  if (res.status !== 200) {
    console.log(await res.text());
    throw new Error("Failed to fetch API");
  }

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data;
}

export async function getLegalPagesSlugs() {
  const data = await fetchAPI(`
    {
      allLegal_pages {
        edges {
          node {
            _meta {
              uid
            }
          }
        }
      }
    }
  `);
  return data?.allLegal_pages?.edges;
}

export async function getLegalPage(slug, lang, previewData) {
  const data = await fetchAPI(
    `
    query getLegalPage($slug: String!, $lang: String!)  {
      legal_page(uid: $slug, lang: $lang) {
        title
        content
        text
        _meta {
          uid
        }
      }
    }
  `,
    {
      previewData,
      variables: {
        slug,
        lang
      },
    }
  );


  return data;
}


// SAMUELBASSETT.XYZ

// export async function getAllProjects(lang, previewData) {
//   const data = await fetchAPI(
//     `
//     query AllProjects($lang: String!)  {
//       allProjects(lang: $lang, sortBy: meta_firstPublicationDate_DESC) {
//         edges {
//           node {
//             page_title
//             title
//             text
//             credits
//             media {
//               image
//               video {
//                 ... on _FileLink {
//                   url
//                 }
//               }
//               video_width
//               video_height
//             }
//             _meta {
//               uid
//               lang
//               firstPublicationDate
//             }
//           }
//         }
//       }
//     }
//   `,
//     {
//       previewData,
//       variables: {
//         lang,
//       },
//     }
//   );

//   return data.allProjects.edges;
// }

export async function getMenu(lang) {
  const data = await fetchAPI(
    `
    query menu($lang: String!)  {
      allMenus(lang: $lang) {
        edges {
          node {
            text_one
            text_two
            menu_items {
              link_text
              link {
                _linkType
                ... on _ExternalLink {
                  url
                }
                ... on _FileLink {
                  name
                  url
                  size
                }
                ... on _Document {
                  _meta {
                    uid
                  }
                }
              }
            }
          }
        }        
      }
    }
  `,
    {
      variables: {
        lang,
      },
    }
  );

  return data.allMenus.edges;
}

export async function getFooter(lang) {
  const data = await fetchAPI(
    `
    query footer($lang: String!)  {
      allFooters(lang: $lang) {
        edges {
          node {
            email_subscribe_text
            footer_items {
              link_text
              link {
                _linkType
                ... on _ExternalLink {
                  url
                }
                ... on _FileLink {
                  name
                  url
                  size
                }
                ... on _Document {
                  _meta {
                    uid
                  }
                }
              }
            }
          }
        }        
      }
    }
  `,
    {
      variables: {
        lang,
      },
    }
  );

  return data.allFooters.edges;
}

export async function getHomePagesSlugs() {

  const data = await fetchAPI(
    `
    {
      allHome_pages {
        edges {
          node {
            _meta {
              lang
            }
          }
        }
      }
    }
    `
  );

  return data?.allHome_pages?.edges;
}

export async function getHome(lang, previewData) {
  const data = await fetchAPI(
    `
    query home($lang: String!)  {
      allHome_pages(lang: $lang) {
        edges {
          node {
            title
            content
          }
        }
      }
    }
  `,
    {
      previewData,
      variables: {
        lang,
      },
    }
  );

  return data?.allHome_pages?.edges;
}

export async function getArtistsPageSlugs() {

  const data = await fetchAPI(
    `
    {
      allArtists_pages {
        edges {
          node {
            _meta {
              uid
              lang
            }
          }
        }
      }
    }
    `
  );

  return data?.allArtists_pages?.edges;
}

export async function getArtistsPage(lang, previewData) {
  const data = await fetchAPI(
    `
    query artists($lang: String!)  {
      allArtists_pages(lang: $lang) {
        edges {
          node {
            title
            content
          }
        }
      }
    }
  `,
    {
      previewData,
      variables: {
        lang,
      },
    }
  );

  return data?.allArtists_pages?.edges;
}

export async function getArtistPageSlugs() {

  const data = await fetchAPI(
    `
    {
      allArtist_pages {
        edges {
          node {
            _meta {
              uid
              lang
            }
          }
        }
      }
    }
    `
  );

  return data?.allArtist_pages?.edges;
}

export async function getArtistPage(uid, lang, previewData) {
  const data = await fetchAPI(
    `
    query artist($uid: String!, $lang: String!)  {
      allArtist_pages(uid: $uid, lang: $lang) {
        edges {
          node {
            content
            images {
              image
            }
            name
            number
            arcade_name
            arcade_link {
              _linkType
              ... on _ExternalLink {
                url
              }
              ... on _FileLink {
                name
                url
                size
              }
              ... on _Document {
                _meta {
                  uid
                }
              }
            }
            commissionner_name
            commissionner_link {
              _linkType
              ... on _ExternalLink {
                url
              }
              ... on _FileLink {
                name
                url
                size
              }
              ... on _Document {
                _meta {
                  uid
                }
              }
            }
            curator_name
            curator_link {
              _linkType
              ... on _ExternalLink {
                url
              }
              ... on _FileLink {
                name
                url
                size
              }
              ... on _Document {
                _meta {
                  uid
                }
              }
            }
            podcast_link {
              _linkType
              ... on _ExternalLink {
                url
              }
              ... on _FileLink {
                name
                url
                size
              }
              ... on _Document {
                _meta {
                  uid
                }
              }
            }
            text
            biography
            _meta {
              uid
              lang
            }
          }
        }
      }
    }
  `,
    {
      previewData,
      variables: {
        uid,
        lang
      },
    }
  );

  return data?.allArtist_pages?.edges;
}

export async function getAllArtistPages(lang) {

  const data = await fetchAPI(
    `
    query AllArtistPages($lang: String!) {
      allArtist_pages(lang: $lang) {
        edges {
          node {
            images {
              image
            }
            number
            name
            _meta {
              uid
              lang
            }
          }
        }
      }
    }
    `,
    {
      variables: {
        lang,
      }
    }
  );

  return data?.allArtist_pages?.edges;
}

export async function getProductPagesSlugs(lang) {
  const data = await fetchAPI(
    `
    query AllProductPages($lang: String!) {
      allProduct_pages(lang: $lang) {
        edges {
          node {
            title
            _meta {
              uid
            }
          }
        }
      }      
    }
    `,
    {
      variables: {
        lang,
      }
    }
  );

  return data.allProduct_pages.edges;
}

export async function getProductPage(uid, lang, previewData) {
  const data = await fetchAPI(
    `
    query ProductPage($uid: String!, $lang: String!) {
      product_page(uid: $uid, lang: $lang) {
        title
        content
        subtitle
        text
        colour_one
        colour_two
        colour_three
        colour_four
        secondary_text_colour
        image_one
        icon
        image_two
        list_title
        list {
          list_icon
          list_text
        }
        cta_icon
        cta_text
        cta_link_text
        cta_link {
          _linkType
          ... on _ExternalLink {
            url
          }
          ... on _FileLink {
            name
            url
            size
          }
          ... on _Document {
            _meta {
              uid
            }
          }
        }
      }      
    }
    `,
    {
      previewData,
      variables: {
        uid,
        lang,
      }
    }
  );

  return data;
}

export async function getAbout(lang, previewData) {
  const data = await fetchAPI(
    `
    query about($lang: String!)  {
      allAbout_pages(lang: $lang) {
        edges {
          node {
            title
            content
            image_one
            icon
            colour_one
            colour_two
            colour_three
            colour_four
            list_one {
              list_one_icon
              list_one_title
              list_one_text
            }
            list_two {
              list_two_title
              list_two_text
            }
            team_title
            team_categories {
              team_category
            }
            team_members {
              image
              name
              job_title
              category
              biography
              email_address
              linkedin_url
            }
            clients_title
            clients_text
            clients_list {
              client_title
              client_text
            }
            client_logos {
              client_logo
            }
          }
        }
      }
    }
  `,
    {
      previewData,
      variables: {
        lang,
      },
    }
  );

  return data.allAbout_pages.edges;
}

export async function getArticlePagesSlugs(lang) {
  const data = await fetchAPI(
    `
    query AllArticlePages($lang: String!) {
      allArticle_pages(lang: $lang) {
        edges {
          node {
            _meta {
              uid
            }
          }
        }
      }      
    }
    `,
    {
      variables: {
        lang,
      }
    }
  );

  return data.allArticle_pages.edges;
}

export async function getArticlePage(uid, lang, previewData) {
  const data = await fetchAPI(
    `
    query ArticlePage($uid: String!, $lang: String!) {
      article_page(uid: $uid, lang: $lang) {
        title
        content
        category
        date
        hero_image
        text
        video {
          ... on _ExternalLink {
            url
          }
          ... on _FileLink {
            name
            url
            size
          }
          ... on _Document {
            _meta {
              uid
            }
          }
        }
      }      
    }
    `,
    {
      previewData,
      variables: {
        uid,
        lang,
      }
    }
  );

  return data;
}

export async function getNewsPage(lang, previewData) {
  const data = await fetchAPI(
    `
    query NewsPage($lang: String!) {
      allNews_pages(lang: $lang) {
        edges {
          node {
            title
            colour_one
            colour_two
            icon
            image_one
            list_one_title
            list_one_link {
              _linkType
              ... on _ExternalLink {
                url
              }
              ... on _FileLink {
                name
                url
                size
              }
              ... on _Document {
                _meta {
                  uid
                }
              }
            }
            list_two_title
            list_two_link {
              _linkType
              ... on _ExternalLink {
                url
              }
              ... on _FileLink {
                name
                url
                size
              }
              ... on _Document {
                _meta {
                  uid
                }
              }
            }
          }
        }
      }      
    }
    `,
    {
      previewData,
      variables: {
        lang,
      }
    }
  );

  return data.allNews_pages.edges;  
}

export async function getArticlePages(lang, previewData) {
  const data = await fetchAPI(
    `
    query AllArticlePages($lang: String!) {
      allArticle_pages(lang: $lang) {
        edges {
          node {
            _meta {
              uid
            }
          }
        }
      }      
    }
    `,
    {
      variables: {
        lang,
        previewData
      }
    }
  );

  return data.allArticle_pages.edges;
}

export async function getArticlePagesCategory(lang, category, previewData) {
  const data = await fetchAPI(
    `
    query AllArticlePagesCategory($lang: String!, $category: String!) {
      allArticle_pages(lang: $lang, where: {category: $category}) {
        edges {
          node {
            title
            is_featured
            date
            category
            content
            thumbnail_image
            _meta {
              uid
            }
          }
        }
      }      
    }
    `,
    {
      variables: {
        lang,
        category,
        previewData
      }
    }
  );

  return data.allArticle_pages.edges;
}

export async function getContactPage(lang, previewData) {
  const data = await fetchAPI(
    `
    query ContactPages($lang: String!)  {
      allContacts(lang: $lang) {
        edges {
          node {
            title
            content
            colour_one
            colour_two
            icon
            text
          }
        }
      }
    }
  `,
    {
      previewData,
      variables: {
        lang,
      },
    }
  );

  return data.allContacts.edges;
}