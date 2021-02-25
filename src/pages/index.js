import React from "react"
import { Link, graphql } from "gatsby"

import Sidebar from "../components/sidebar"
import QAndA from "../components/qanda"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      
      {/* 
        Insert side bar here
      */}
      <div class='index-wrapper'>
        <div class='index-column-l'>
          <div class='left-column'>
            <Sidebar />
          </div>
        </div>
        <div class='index-column-r'>
          <div class='right-column'>
            <QAndA />
            {/*<h3 style={{textDecoration:`none`}}>
              ................................
            </h3>*/}
            <br />
            <hr />
            <ol style={{ listStyle: `none` }}>
              {posts.map(post => {
                const title = post.frontmatter.title.toLowerCase() || post.fields.slug.toLowerCase()

                return (
                  <li key={post.fields.slug}>
                    <article
                      className="post-list-item"
                      itemScope
                      itemType="http://schema.org/Article"
                    >
                      <header>
                        <h5>
                          <Link to={post.fields.slug} itemProp="url">
                            <span itemProp="headline">{title}</span>
                          </Link>
                        </h5>
                        <small>{post.frontmatter.date.toLowerCase()}</small>
                      </header>
                      <section
                        className="post-list-section"
                      >
                        <p className="post-desc"
                          dangerouslySetInnerHTML={{
                            __html: post.frontmatter.description || post.excerpt,
                          }}
                          itemProp="description"
                        />
                      </section>
                    </article>
                  </li>
                )
              })}
            </ol>
          </div>
          <footer>
          © {new Date().getFullYear()} Rationality
          {` `}
        </footer>
        </div>
      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
