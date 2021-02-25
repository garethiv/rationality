/**
 * Sidebar component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

const Sidebar = () => {
  const data = useStaticQuery(graphql`
    query SidebarQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50, quality: 95) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
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
            tags
            description
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const avatar = data?.avatar?.childImageSharp?.fixed

  return (
    <div className="sidebar">
      <Link style={{ textDecoration: `none` }} to={`/`} itemProp="url">
        <h2>rationality</h2>                      
      </Link>
      
      
      {/*TODO: LIST OF TAGS*/}
      {avatar && (
        <Image
          fixed={avatar}
          alt={author?.name || ``}
          className="bio-avatar"
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
      )}
      <br/>
      <h3>
        <a href="https://twitter.com/garethveale" target="_blank" rel="noopener noreferrer">
          twitter 
        </a>
      </h3>     
    </div>
  )
}

export default Sidebar
