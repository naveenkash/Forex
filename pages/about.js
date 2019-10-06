import React, { Component } from 'react'

import Head from 'next/head'
import Layout from '../layouts/main';
export class about extends Component {
    render() {
        return (
            <Layout>
            <div>
            <Head>
     <title>About Us</title>
     </Head> 
                <h1>about page</h1>
            </div>
            </Layout>
        )
    }
}

export default about
