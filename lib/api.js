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
            arcade_title
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
            commissionner_title
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
            geo_point
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

export async function getAProposPageSlugs() {

  const data = await fetchAPI(
    `
    {
      allA_propos_pages {
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

  return data?.allA_propos_pages?.edges;
}

export async function getAProposPage(lang, previewData) {
  const data = await fetchAPI(
    `
    query aPropos($lang: String!)  {
      allA_propos_pages(lang: $lang) {
        edges {
          node {
            title
            content
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

  return data.allA_propos_pages.edges;
}

export async function getPartenairesPageSlugs() {

  const data = await fetchAPI(
    `
    {
      allPartenaires_pages {
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

  return data?.allPartenaires_pages?.edges;
}

export async function getPartenairesPage(lang, previewData) {
  const data = await fetchAPI(
    `
    query allPartenaires($lang: String!)  {
      allPartenaires_pages(lang: $lang) {
        edges {
          node {
            title
            content
            link_list_one {
              link_text
              link_url {
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
            link_list_two_title
            link_list_two {
              link_text
              link_url {
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
      previewData,
      variables: {
        lang,
      },
    }
  );

  return data.allPartenaires_pages.edges;
}

export async function getCommissairesPageSlugs() {

  const data = await fetchAPI(
    `
    {
      allCommissaires_pages {
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

  return data?.allCommissaires_pages?.edges;
}

export async function getCommissairesPage(lang, previewData) {
  const data = await fetchAPI(
    `
    query commissaires($lang: String!)  {
      allCommissaires_pages(lang: $lang) {
        edges {
          node {
            title
            content
            list {
              item_title
              item_subtitle
              item_subtitle_text
              item_biography_title
              item_biography
              item_image
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

  return data.allCommissaires_pages.edges;
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