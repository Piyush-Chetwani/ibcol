import React from 'react';
import styled from 'styled-components';

import configs from 'configs';

import { media, style } from 'helpers/styledComponents.js';

import {translate} from 'helpers/translate.js';
import { transparentize } from 'polished'

import { Link } from '/routes';

import PageContainerComponent from 'components/PageContainerComponent';

import Head from 'next/head';


// const pagePadding = {
//   xSmall: style.dimension.normal.pagePadding.xSmall,
//   small: style.dimension.normal.pagePadding.small,
//   medium: style.dimension.normal.pagePadding.medium,
//   large: style.dimension.normal.pagePadding.large,
//   xLarge: style.dimension.normal.pagePadding.xLarge,
//   xxLarge: style.dimension.normal.pagePadding.xxLarge
// }





const ThisPageContainerComponent = styled(PageContainerComponent)`


  

`;


export default class extends React.Component {
  static async getInitialProps({ query }) {
    
    return { query }
  }
  
    translate = (t) => translate(t, 'sponsors', this.props.query.locale);
  
  render() {
    
    // console.log(">>> query", this.props.query);


    const locale = this.props.query.locale;
    
    return (
      <ThisPageContainerComponent>
            <Head>
                <title>{this.translate('siteTitle')} {this.translate('titleSeparator')} {this.translate('pageTitle')}</title>
                <meta name="description" content={this.translate('seoDescription')}/>
                <meta name="keywords" content={this.translate('keywords')}/>
                <meta property="og:image" content={`${configs.url}${this.translate('ogImage')}`} />
                <meta property="og:type" content="website" />
            </Head>
        
            


            <section className="s-section target-section first">

                <div className="row section-header">
                    <div className="col-block">
                        <h3 className="subhead">{this.translate('subhead')}</h3>
                    </div>
                </div>

                <div className="row corporate-logo">

                    <div className="col-block">
                        <h1>{this.translate('titleSponsorTitle')}</h1>
                    </div>

                    <div className="block-1-3 block-tab-full">

                        {
                            this.translate('titleSponsor').map((sponsor, index)=>{
                                return <div className="col-block" key={index}>
                                    <a href={sponsor.url} target="_blank">
                                        <img src={sponsor.logo} alt={sponsor.name} />
                                    </a>
                                    <p dangerouslySetInnerHTML={{__html: sponsor.description}}/>
                                </div>
                            })
                        }
                        
                    </div>

                    


                </div>

            </section>





            <section className="s-section target-section" style={{"paddingBottom":"16rem"}}>

                <div className="row corporate-logo">

                    <div className="col-block">
                        <h1>{this.translate('generalSponsorTitle')}</h1>
                    </div>

                    <div className="block-1-3 block-tab-full">
                        {
                            this.translate('generalSponsor').map((sponsor, index)=>{
                                return <div className="col-block" key={index}>
                                    <a href={sponsor.url} target="_blank">
                                        <img src={sponsor.logo} alt={sponsor.name} />
                                    </a>
                                    <p dangerouslySetInnerHTML={{__html: sponsor.description}}/>
                                </div>
                            })
                        }                       
                    </div>

                    <div className="col-block">
                        <h1>{this.translate('coHostTitle')}</h1>
                    </div>

                    <div className="block-1-3 block-tab-full">
                        {
                            this.translate('coHost').map((sponsor, index)=>{
                                return <div className="col-block" key={index}>
                                    <a href={sponsor.url} target="_blank">
                                        <img src={sponsor.logo} alt={sponsor.name} />
                                    </a>
                                    <p dangerouslySetInnerHTML={{__html: sponsor.description}}/>
                                </div>
                            })
                        }                       
                    </div>

                    <div className="col-block">
                        <h1>{this.translate('travelPartnersTitle')}</h1>
                    </div>

                    <div className="block-1-3 block-tab-full">
                        {
                            this.translate('travelPartners').map((sponsor, index)=>{
                                return <div className="col-block" key={index}>
                                    <a href={sponsor.url} target="_blank">
                                        <img src={sponsor.logo} alt={sponsor.name} />
                                    </a>
                                    <p dangerouslySetInnerHTML={{__html: sponsor.description}}/>
                                </div>
                            })
                        }                       
                    </div>

                    <div className="col-block">
                        <h1>{this.translate('academicPartnersTitle')}</h1>
                    </div>

                    <div className="block-1-3 block-tab-full">
                        {
                            this.translate('academicPartners').map((sponsor, index)=>{
                                return <div className="col-block" key={index}>
                                    <a href={sponsor.url} target="_blank">
                                        <img src={sponsor.logo} alt={sponsor.name} />
                                    </a>
                                    <p dangerouslySetInnerHTML={{__html: sponsor.description}}/>
                                </div>
                            })
                        }                       
                    </div>

                    <div className="col-block">
                        <h1>{this.translate('supportingOrganisationsTitle')}</h1>
                    </div>

                    <div className="block-1-3 block-tab-full">
                        {
                            this.translate('supportingOrganisations').map((sponsor, index)=>{
                                return <div className="col-block" key={index}>
                                    <a href={sponsor.url} target="_blank">
                                        <img src={sponsor.logo} alt={sponsor.name} />
                                    </a>
                                    <p dangerouslySetInnerHTML={{__html: sponsor.description}}/>
                                </div>
                            })
                        }                       
                    </div>
                           
                </div>

                <div className="row">
                    <div className="col-block" dangerouslySetInnerHTML={{__html: this.translate('prompt')}}/>
                </div>

            </section>
        
        
        
      </ThisPageContainerComponent>
    )
  }
}
    