import React from "react"
import { graphql } from "gatsby"

import StaticPageContent from "../components/staticPageContent"

class ContactPage extends React.Component {
  render() {
    return <StaticPageContent data={this.props.data} title={"Kontakt"} />
  }
}

export default ContactPage

export const pageQuery = graphql`
  query ContactQuery {
    allStrapiStatic(filter: { key: { eq: "kontakt" } }, limit: 1) {
      nodes {
        title
        content
      }
    }
  }
`
