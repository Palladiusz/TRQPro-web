import React from "react"
import { graphql, navigate } from "gatsby"
import Layout from "../components/layouts/layout"
import IndexPager from "../components/index/shared/indexPager"
import SEO from "../components/seo"
import "../styles/tagCategoryResults.scss"
import { Row, Col } from "react-bootstrap"
import MiniArticleImageWrapper from "../components/index/shared/miniArticleImageWrapper"

class TagTemplate extends React.Component {
  getTagName() {
    if (this.props.location.state) {
      return this.props.location.state.tagName
    } else {
      return this.props.pageContext.key
    }
  }

  render() {
    return (
      <Layout>
        <SEO title={`Tag - ${this.getTagName()}`} />
        <p className="categoryTagResults">
          Wyniki wpisów pod tagiem:{" "}
          <span className={"name"}>{this.getTagName()}</span>{" "}
        </p>
        <Row>
          {this.props.data.allStrapiArticle.edges.map((element, i) => {
            return (
              <Col xs={12} key={i}>
                <MiniArticleImageWrapper article={element.node} />
              </Col>
            )
          })}
        </Row>

        {this.props.data.allStrapiArticle.pageInfo.pageCount > 1 ? (
          <IndexPager
            activePageIndex={this.props.pageContext.currentPage - 1}
            pageCount={this.props.data.allStrapiArticle.pageInfo.pageCount}
            onPageChangeCallback={page => {
              if (page === 0) {
                navigate(`/tag/${this.props.pageContext.key}`)
              } else {
                navigate(
                  `/tag/${this.props.pageContext.key}/strona/${page + 1}`
                )
              }
            }}
          />
        ) : (
          <div className={"margin-bottom-40"} />
        )}
      </Layout>
    )
  }
}

export default TagTemplate

export const query = graphql`
  query TagTemplate($key: String!, $skip: Int!, $limit: Int!, $date: Date) {
    allStrapiArticle(
      filter: {
        publishedAt: { lte: $date }
        tags: { elemMatch: { key: { eq: $key } } }
      }
      limit: $limit
      sort: { order: DESC, fields: publishedAt }
      skip: $skip
    ) {
      edges {
        node {
          id
          title
          publishedAt
          strapiId
          content
          image {
            publicURL
            childImageSharp {
              fluid(maxWidth: 960) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          fields {
            slug
          }
          category {
            key
            name
          }
          author {
            id
            username
          }
        }
      }
      pageInfo {
        pageCount
      }
    }
  }
`
