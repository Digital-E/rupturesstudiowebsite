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
              lang
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
      allLegal_pages(uid: $slug, lang: $lang) {
        edges {
          node {
            title
            content
            text
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
        slug,
        lang
      },
    }
  );


  return data?.allLegal_pages?.edges;
}



// SAMUELBASSETT.XYZ

export async function getMenu() {

  const data = await fetchAPI(
    `
    query {
      allMenus {
        edges {
          node {
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
      variables: {},
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


export async function getHome( previewData ) {
  const data = await fetchAPI(
    `
    query {
      allHomes {
        edges {
          node {
            title
            content
            video
            featured {
              project {
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
                    id
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
      },
    }
  );

  return data?.allHomes?.edges;
}

export async function getArchive( previewData ) {
  const data = await fetchAPI(
    `
    query {
      allArchives {
        edges {
          node {
            title
            content
            tags {
              tag
            }
          }
        }
      }
    }
  `,
    {
      previewData,
      variables: {
      },
    }
  );

  return data?.allArchives?.edges;
}

export async function getProject(id, previewData) {
  const data = await fetchAPI(
    `
    query project($id: String!)  {
      allProjects(id: $id) {
        edges {
          node {
            _meta {
              uid
            }
            title
            year
            tags {
              tag
            }
            thumbnails {
              image
              video
              video_height
              video_width
            }
          }
        }
      }
    }
  `,
    {
      previewData,
      variables: {
        id
      },
    }
  );

  return data?.allProjects?.edges;
}

export async function getAllProjects() {

  const data = await fetchAPI(
    `
    {
      allProjects(sortBy: year_DESC) {
        pageInfo {
          startCursor
          endCursor
        }
        edges {
          node {
            _meta {
              uid
            }
            title
            year
            tags {
              tag
            }
            thumbnails {
              image
              video
              video_height
              video_width
            }
          }
          cursor
        }
      }
    }
    `
  );

  return data?.allProjects;
}

export async function getAllProjectsPaginate(after) {

  const data = await fetchAPI(
    `
    query AllProjectsPaginate($after: String!) {
      allProjects(after: $after, sortBy: year_DESC) {
        pageInfo {
          startCursor
          endCursor
        }
        edges {
          node {
            _meta {
              uid
            }
            title
            year
            tags {
              tag
            }
            thumbnails {
              image
              video
              video_height
              video_width
            }
          }
          cursor
        }
      }
    }
    `,
    {
      variables: {
        after
      }
    }
  );

  return data?.allProjects;
}

// export async function getProjectPageSlugs() {

//   const data = await fetchAPI(
//     `
//     {
//       allProjects {
//         pageInfo {
//           startCursor
//           endCursor
//         }
//         edges {
//           node {
//             _meta {
//               uid
//               lang
//             }
//           }
//           cursor
//         }
//       }
//     }
//     `
//   );

//   return data?.allProjects?.edges;
// }

export async function getProjectPageSlugs() {
  const data = await fetchAPI(
    `
    {
      allProjects {
        edges {
          node {
            _meta {
              uid
            }
          }
        }
      }
    }
    `
  );

  return data?.allProjects?.edges;
}

export async function getProjectPage(uid, previewData) {
  const data = await fetchAPI(
    `
    query project($uid: String!)  {
      allProjects(uid: $uid) {
        edges {
          node {
            title
            content
            hero_image
            hero_video
            year
            tags {
              tag
            }
            slices {
              __typename
              ... on ProjectSlicesText {
                variation {
                  ... on ProjectSlicesTextDefault {
                    primary {
                      text
                    }
                  }
                }
              }
              ... on ProjectSlicesMedia_gallery {
                variation {
                  ... on ProjectSlicesMedia_galleryDefault {
                    primary {
                      carousel
                      width
                    }
                    items {
                      image
                      video
                      video_width
                      video_height
                    }
                  }
                }
              }                 
            }
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
        uid
      },
    }
  );

  return data?.allProjects?.edges;
}

export async function getAbout( previewData ) {
  const data = await fetchAPI(
    `
    query {
      allAbouts {
        edges {
          node {
            title
            content
            information
            information_two
            tags_one_title
            tags_one {
              tag
              client {
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
                    id
                    uid
                  }
                }
              }
            }
            tags_two_title
            tags_two {
              tag
            }
          }
        }
      }
    }
  `,
    {
      previewData,
      variables: {
      },
    }
  );

  return data?.allAbouts?.edges;
}

export async function getClient(id, previewData) {
  const data = await fetchAPI(
    `
    query client($id: String!)  {
      allClients(id: $id) {
        edges {
          node {
            client
            images {
              image
            }
          }
        }
      }
    }
  `,
    {
      previewData,
      variables: {
        id
      },
    }
  );

  return data?.allClients?.edges;
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
        lang
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
            podcast_name
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
      allArtist_pages(lang: $lang, sortBy: number_ASC) {
        pageInfo {
          hasNextPage
          startCursor
          endCursor
        }
        edges {
          node {
            images {
              image
            }
            geo_point
            number
            name
            arcade_name
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
        lang
      }
    }
  );

  return data?.allArtist_pages;
}

export async function getAllArtistPagesPaginate(lang, after) {

  const data = await fetchAPI(
    `
    query AllArtistPages($lang: String!, $after: String!) {
      allArtist_pages(lang: $lang, after: $after, sortBy: number_ASC) {
        pageInfo {
          hasNextPage
          startCursor
          endCursor
        }
        edges {
          node {
            images {
              image
            }
            geo_point
            number
            name
            arcade_name
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
        after
      }
    }
  );

  return data?.allArtist_pages;
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
            link_list_one_title
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
            body {
              __typename
              ... on Partenaires_pageBodyList {
                primary {
                  list_title
                }
                fields {
                  image
                  list_item_title
                  list_item_subtitle
                  list_item_url {
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

export async function getRendezVousPageSlugs() {

  const data = await fetchAPI(
    `
    {
      allRendezVous_pages {
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

  return data?.allRendezVous_pages?.edges;
}

export async function getRendezVousPage(lang, previewData) {
  const data = await fetchAPI(
    `
    query rendezvous($lang: String!)  {
      allRendezVous_pages(lang: $lang) {
        edges {
          node {
            title
            content
            list_one_title
            list_one_text
            list_one {
              list_one_item_title
              list_one_item_date
              list_one_item_link_text
              list_one_item_link_url {
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
              list_one_item_text
              list_one_item_information_one
              list_one_item_information_one_link {
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
              list_one_item_information_two
            }
            list_two_title
            list_two_text
            list_two {
              list_two_item_title
              list_two_item_title_two
              list_two_item_link_url {
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
              list_two_item_link_two_text
              list_two_item_link_two_url {
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

  return data.allRendezVous_pages.edges;
}

export async function getContactPageSlugs() {

  const data = await fetchAPI(
    `
    {
      allContact_pages {
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

  return data?.allContact_pages?.edges;
}



export async function getContactPage(lang, previewData) {
  const data = await fetchAPI(
    `
    query ContactPages($lang: String!)  {
      allContact_pages(lang: $lang) {
        edges {
          node {
            title
            content
            column_one_title
            socials_text_one
            socials_text_two
            insta_link {
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
            facebook_link {
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
            text_one
            text_two
            text_three
            button_text
            text_four
            text_five
            text_six
            column_two_title
            column_two_text
            column_three_title
            column_three_text
            legal_link_text
            legal_link_url {
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
      },
    }
  );

  return data?.allContact_pages?.edges;
}
