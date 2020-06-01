import React, { Component } from "react";
import logo from "../../images/logo.png";
import { Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import Loading from "react-fullscreen-loading";
import "../../css/style.css";

export default class Privacy extends Component {
  state = { flag: false };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ flag: true });
    }, 1000);
  }
  render() {
    if (this.state.flag) {
      return (
        <div style={{ paddingTop: "70px" }} className="terms">
          <Container>
            <Container><Container>
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                height="50"
                style={{ marginBottom: "90px", cursor: "pointer" }}
              />
            </Link>
            <h2
              style={{ opacity: "0.2", marginBottom: "70px", fontSize: "30px" }}
            >
              Privacy Policy
            </h2>
            <div style={{ fontSize: "28px", marginBottom:"140px" }}>
            Effective Date: June 3rd, 2019
            <br/><br/>
            Welcome to YOLO!
            <br/><br/>
            Popshow is committed to protecting and respecting your privacy.
            <br/><br/>
            This Privacy Policy describes how we collect, use, protect and share information about you that we obtain when you access and use our App (defined below), including when you register for an account, post a question, request customer support, participate in contests or promotions, or submit questions or feedback. This Privacy Policy also applies to information that we obtain when you communicate or interact with us outside of the App, including by e-mail, telephone and otherwise.
            <br/><br/>
            Please read this Privacy Policy carefully to understand how we will treat your information before you start to use our App or communicate with us outside the App. This Privacy Policy also is intended to explain the conditions under which Popshow uses and discloses that information, and your rights in relation to that information. Changes to this Privacy Policy are discussed at the end of this document.
            <br/><br/>
            Certain features or functionalities of our App may be available via the App. This Privacy Policy governs the collection and use of data about you and your use of the App. (Although, we may provide additional notice and choice options within the App itself.)
            <br/><br/>
            For purposes of this Privacy Policy, the following defined terms mean:
            <br/><br/>
            “App” refers to the YOLO downloadable mobile application owned and operated by Popshow. References to the “App” include any and all features, functionality, tools and content available on or through such application.
            <br/><br/>
            “Popshow,” “we,” or “us” refer to Popshow, Inc. and our officers, directors, employees, contractors and agents. [To the extent applicable, they also refer to our affiliates, service providers and licensors, and their respective officers, directors, employees, contractors and agents.]
            <br/><br/>
            “Users” means any and all persons that access or use the App. References to “access” and/or “use” of the App (and any variations thereof) include the acts of accessing or browsing the App.
            <br/><br/>
            BY ACCESSING OR USING OUR APP OR COMMUNICATING WITH US OUTSIDE OF THE APP, YOU ARE ACCEPTING AND CONSENTING TO THE PRACTICES DESCRIBED IN THIS PRIVACY POLICY, WHICH MAY BE UPDATED AND AMENDED FROM TIME TO TIME. IF YOU DO NOT AGREE TO THE TERMS OF THIS PRIVACY POLICY, YOU MUST NOT ACCESS OR USE OUR APP OR OTHERWISE COMMUNICATE WITH US.
            <br/><br/>
            HOW WE COLLECT INFORMATION
            <br/><br/>
            Information You Provide to Us
            <br/><br/>
            We collect information that you provide directly to us, including when you register for an account, update your e-mail preferences, respond to a survey or provide other feedback about the App, or contact us with questions or comments about the App.
            <br/><br/>
            We may also collect information about you when you opt in to receive text messages from us (for example, when you sign up for YOLO). You may opt in to receive such updates and offers by providing your mobile telephone number through the App.
            <br/><br/>
            We will not ask for or request sensitive information such as government identifiers, medical information, or financial information. Please do not provide this information to us through e-mails, feedback forms or in any other way unless specifically requested.
            <br/><br/>
            Information Generated from Use of the App
            <br/><br/>
            We also collect certain technical information when you access, browse and use our App, including information that we automatically receive and record from your browser or mobile platform on our server logs. This technical information helps us operate and provide our App to you, and includes standard information about visits and system capabilities, such as:
            <br/><br/>
            <ul>
            <li style={{marginLeft:"40px"}}>information about the device(s) you use to access our App, including MAC address, IP address, browser type and version, your location, time zone setting, browser plug-in types and versions, operating system and platform, device type, device and application identifiers, operating information, mobile carrier, and cookies;</li>
            <li style={{marginLeft:"40px"}}>information about your visits to the App, including the full URL clickstream to, through, and from the App, including dates and times;</li>
            <li style={{marginLeft:"40px"}}>information we need and use to facilitate your use of our App (including to provide access to third party websites and services), such as URL requests, destination IP addresses, or device configuration details;</li>
            <li style={{marginLeft:"40px"}}>pages you view, searches you run, length of time browsing search results, specific search results you select to view, length of visits to other pages, page interaction information (such as scrolling, clicks, and mouse-overs), your engagement with certain variable/dynamic elements of a page and methods used to browse away from the page; and
            page response times and download errors.</li>
            <li style={{marginLeft:"40px"}}>Some of the information we collect is generated using cookies and beacons. For more details about cookies, beacons, and your choices, see Cookies and Beacons below.</li>
            </ul>
            <br/><br/>
            Snapchat Integration
            <br/><br/>
            You may choose to connect to us through Snapchat, and when you do, we may collect additional information from you, such as your display name and Bitmoji, through Snapchat. Please be advised that social media platforms may also collect information from you. We do not have control over the collection, use and sharing practices of social media platforms and encourage you to review their usage and disclosure policies and practices, including the data security practices, before using the social media platforms.
            <br/><br/>
            Information from Other Sources
            <br/><br/>
            We may also supplement the technical information we collect from your use of the App with information collected by third parties. Such third parties may include service providers that help us understand our Users and provide better service to our Users.
            <br/><br/>
            On occasion, we may compare or combine Personally Identifiable Information (defined below) from third party sources to/with other information we have collected. For example, we may obtain contact information from other sources in order to contact you if we think you or the company you represent would be interested in our App.
            <br/><br/>
            HOW INFORMATION MAY BE USED
            <br/><br/>
            Personally Identifiable Information
            <br/><br/>
            Some of the information we collect through your use of our App or communications with us may personally identify you (“Personally Identifiable Information”). The types of Personally Identifiable Information you may submit in connection with use of the App include:
            <br/><br/>
            <ul>
            <li style={{marginLeft:"40px"}}>telephone number;</li>
            <li style={{marginLeft:"40px"}}>Snapchat display name;</li>
            <li style={{marginLeft:"40px"}}>geographic location.</li>
            </ul>
            Other data derived from your use of the App is treated as "Non-Personally Identifiable Information," unless it is combined with Personally Identifiable Information, or unless otherwise required by applicable law.
            <br/><br/>
            We may use the Personally Identifiable Information we collect, to:
            <br/><br/>
            <ul>
              <li style={{marginLeft:"40px"}}>create and manage your account;</li>
              <li style={{marginLeft:"40px"}}>provide the App to you;</li>
              <li style={{marginLeft:"40px"}}>operate our App, including access management, App administration, internal operations, troubleshooting, data analysis, testing, research, statistical and survey purposes;</li>
              <li style={{marginLeft:"40px"}}>send you information that enables you to use our App;</li>
              <li style={{marginLeft:"40px"}}>contact you about activity on your account;</li>
              <li style={{marginLeft:"40px"}}>provide you access to, and updates regarding the App and other related offers via text message;</li>
              <li style={{marginLeft:"40px"}}>respond to your requests, feedback or inquiries;</li>
              <li style={{marginLeft:"40px"}}>notify you about updates, information, or alerts regarding our App;</li>
              <li style={{marginLeft:"40px"}}>comply with laws, regulations, and other legal requirements;</li>
              <li style={{marginLeft:"40px"}}>comply with relevant industry standards and our policies;</li>
              <li style={{marginLeft:"40px"}}>protect and enforce our rights and the rights of other Users against unlawful activity, including identify theft and fraud, and other violations of our Terms of Use;</li>
              <li style={{marginLeft:"40px"}}>protect and enforce our rights arising under any agreements entered into between you and us;</li>
              <li style={{marginLeft:"40px"}}>protect the integrity and maintain the security of our App, including secured areas of the App;</li>
              <li style={{marginLeft:"40px"}}>operate, evaluate and improve our business, including conducting surveys and market research, developing new products, services, and promotions (such as, for example, special events, programs, offers, contests), analyzing and enhancing existing products, services, and promotions, managing our communications; performing accounting, auditing, and other internal functions;</li>
              <li style={{marginLeft:"40px"}}>provide you with information and advertisements about products, services, and promotions, from that may interest you; and
              administer your participation in such products, services, and promotions.</li>
              <li style={{marginLeft:"40px"}}>In addition, we may use your information as described in any notice provided at the time you provide the information; and for any other purpose for which you may provide consent.</li>
            </ul>
            <br/><br/>
            Non-Personally Identifiable Information
            <br/><br/>
            In addition to the uses described above, we may also use Non-Personally Identifiable Information to: deliver content tailored to your interests and the manner in which you use App, and present content in a manner that is optimized for your device.
            <br/><br/>
            We may also combine technical information, or Non-Personally Identifiable Information, about your use of our App with information that we obtain from other Users to use in an aggregate or anonymous manner for similar purposes.
            <br/><br/>
            HOW INFORMATION MAY BE SHARED
            <br/><br/>
            Personally Identifiable Information
            <br/><br/>
            We will not sell or share your Personally Identifiable Information with third parties for the third party's own direct marketing purposes without your express consent.
            <br/><br/>
            We may share Personally Identifiable Information with:
            <br/><br/>
            <ul>
            <li style={{marginLeft:"40px"}}>our service providers to the extent reasonably necessary to enable us operate our business and provide our App to you, as described in this Privacy Policy (e.g., to an e-mail service provider in order to enable us to e-mail you);</li>
            <li style={{marginLeft:"40px"}}>a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, dissolution, liquidation, or other sale or transfer of some or all of our assets, whether as a going concern or as part of bankruptcy, liquidation or similar proceeding, in which Personally Identifiable Information held by us about our Users is among the assets transferred;</li>
            <li style={{marginLeft:"40px"}}>other third parties with your express consent for any purpose disclosed by us when you provide the information; and
            you, upon your written request.</li>
            <li style={{marginLeft:"40px"}}>We do not permit these third parties to use any Personally Identifiable Information we share for any purpose other than (i) as described in this Privacy Policy, and (ii) to comply with their own legal requirements.</li>
            </ul>
            <br/><br/>
            We may also disclose Personally Identifiable Information with law enforcement agencies, government officials, or other third parties as necessary for the purpose of:
            <br/><br/>
            <ul>
            <li style={{marginLeft:"40px"}}>complying with any court order, law or legal process, including to respond to any government or regulatory request;</li>
            <li style={{marginLeft:"40px"}}>preventing fraud and providing credit risk reduction;</li>
            <li style={{marginLeft:"40px"}}>investigating potential unauthorized access or misuse of our App or other breach of our Terms of Use, Supplemental Terms (as defined below), App Rules (as defined below) other agreements;</li>
            <li style={{marginLeft:"40px"}}>protecting the assets or property, and enforcing the rights of Popshow, including for billing and collection purposes; and
            protecting the rights, property, or safety of our Users or others.</li>
            <li style={{marginLeft:"40px"}}>In the event that we receive a request from a governmental entity to provide it with your Personally Identifiable Information, we will make reasonable attempts to notify you of such request, to the extent reasonably possible and legally permissible.</li>
            </ul>
            <br/><br/>
            Notice to California Residents / Your California Privacy Rights
            <br/><br/>
            California Civil Code permits California residents to request that we not share your Personally Identifiable Information with third parties for their direct marketing purposes. If you are a California resident, you may contact [support@onyolo.com] to request information regarding how we share Personally Identifiable Information with third parties for their direct marketing purposes and/or to request that such information not be shared with third parties for such purposes.
            <br/><br/>
            Non-Personally Identifiable Information
            <br/><br/>
            In addition, we may share Non-Personally Identifiable Information, including aggregated or anonymized data:
            <br/><br/>
            <ul>
            <li style={{marginLeft:"40px"}}>with analytics, search engine, or other service providers that help us improve our App;</li>
            <li style={{marginLeft:"40px"}}>to report to our affiliates, licensors and service providers about the use of various aspects of the App; and</li>
            <li style={{marginLeft:"40px"}}>with other Users or prospective Users of the App.</li>
            </ul>
            <br/><br/>
            COOKIES AND BEACONS
            <br/><br/>
            We may use cookies, beacons and similar technologies, now or in the future, to support the functionality of our App. This provides a better experience when you visit our App and allows us to improve our App. Our service providers may use cookies and beacons to collect and share Non-Personally Identifiable Information about your activities both on our App and on other websites. In addition, third parties that are unaffiliated with us may also collect information about you, including tracking your browsing history, when you use our App. We do not have control over these third party collection practices. If you wish to minimize these third-party collections, and you can adjust the settings of your browsers or install plug-ins and add-ins.
            <br/><br/>
            <ul>
            <li style={{marginLeft:"40px"}}>Browser Cookies. A browser cookie is a small file placed on the hard drive of your computer. That cookie then communicates with servers, ours or those of other companies that we authorize to collect data for us, and allows recognition of your personal computer. We do not collect Personally Identifiable Information from browser cookies and we do not associate browser cookies with your Personally Identifiable Information. You may use the tools available on your computer or other device to set your browser to refuse or disable all or some browser cookies, or to alert you when cookies are being set. However, if you refuse or disable all browser cookies, you may be unable to access certain parts or use certain features or functionality of our App. Unless you have adjusted your browser settings so that it refuses all cookies, we may use cookies when you direct your browser to our App.</li>
            </ul>
            To learn more about cookies, you can visit http://www.allaboutcookies.org.
            <br/><br/>
            <ul>
            <li>Flash Cookies. Certain features of our App may use local stored objects called flash cookies to collect and store information about your preferences and navigation to, from and on our App. The cookies do not identify you as an individual or track your online behavior. We do not collect Personally Identifiable Information from flash cookies and we will not associate them with your Personally Identifiable Information. Flash cookies are not managed by the same browser settings as are used for browser cookies. To learn how you can manage your Flash cookie settings, visit the Flash player settings page on Adobe’s website. If you disable or refuse Flash cookies, please note that some parts of our App may be inaccessible or may not function properly.</li>
            <li>Beacons. Our App and e-mails may contain small electronic files known as beacons (also referred to as web beacons, clear GIFs, pixel tags and single-pixel GIFs) that permit us to, for example, count Users who have visited those pages or opened an e-mail and for other website-related statistics. Beacons in e-mail marketing campaigns allow us to track your responses and your interests in our content, offerings and web pages. You may use the tools in your device to disable these technologies as well.</li>
            </ul>
            YOUR CHOICES
            <br/><br/>
            We offer you certain choices in connection with the information we collect from you.
            <br/><br/>
            Email Communications
            <br/><br/>
            You may have the opportunity to receive certain communications from us related to our App. If you provide us with your e-mail address in order to receive communications, you can opt out of marketing e-mails at any time by following the instructions at the bottom of our e-mails and adjusting your e-mail preferences. Please note that certain e-mails may be necessary for the operation of our App. You will continue to receive these e-mails, if appropriate, even if you unsubscribe from our optional communications.
            <br/><br/>
            Cookies/ Beacons
            <br/><br/>
            If you wish to minimize information collected by cookie or beacon, you can adjust the settings of your browsers to notify you when you receive a cookie, which lets you choose whether or not to accept it. You can also set your browser to automatically reject any cookies. You may also be able to install plug-ins and add-ins that serve similar functions. However, please be aware that some features and services on our App may not work properly if we are not able to recognize and associate you with your account. In addition, the offers we provide when you visit us may not be as relevant to you or tailored to your interests.
            <br/><br/>
            Do Not Track
            <br/><br/>
            Some browsers support a “Do Not Track” (or, DNT) feature, a privacy preference that Users can set in certain web browsers, which is intended to be a signal to websites and services that you do not wish to be tracked across different websites or online services you visit. Our App does not currently recognize or respond to DNT signals, so DNT settings do not change the way the App operates.
            <br/><br/>
            Please note that we cannot control how third party websites or online services you visit through our App respond to Do Not Track signals. Check the privacy policies of those third parties for information on their privacy practices.
            <br/><br/>
            Text Alerts
            <br/><br/>
            You may have the opportunity to receive certain information, updates and/or offers from us via text communications. If you provide us with your mobile number in order to receive such communications, you can opt out of receiving text messages at any time by texting STOP to in response to a text from us.
            <br/><br/>
            Updating or Deleting Information
            <br/><br/>
            The accuracy of the information we have about you is very important. To review, correct or delete your Personally Identifiable Information, please contact us at [support@onyolo.com].
            <br/><br/>
            SECURING YOUR INFORMATION
            <br/><br/>
            The security of your information is important to Popshow, and we have established administrative, technical, and physical safeguards designed to protect your Personally Identifiable Information against unauthorized alteration, access, loss, theft, use or disclosure. Unfortunately, no system can guarantee complete security of your information. As a result, Popshow cannot ensure or warrant that your information, including your Personally Identifiable Information, is secure from unauthorized third parties. Thus, your use of the App and communication with us about them is at your own risk.
            <br/><br/>
            You are responsible for protecting your username and password(s) and for the security of information that you transmit to us over the internet.
            <br/><br/>
            If you have reason to believe that your interaction with the App is no longer secure (for example, if you feel that the security of your username or password has been compromised), you must immediately notify us of the problem by contacting us.
            <br/><br/>
            CHILDREN
            <br/><br/>
            Our App is directed to and is intended to be used only by persons who are 17 years of age or older. We do not knowingly collect information from children under 18. If you are under 17 years of age, you are not permitted to register for an account or otherwise submit any Personally Identifiable Information to us, including your name, address or e-mail address. If we discover that we have collected any Personally Identifiable Information from a child under the age of 17, we will suspend the associated account and remove that information from our database as soon as possible. By registering for an account or submitting any Personally Identifiable Information to us, you represent and warrant that you are 17 years of age or older.
            <br/><br/>
            LINKS TO THIRD PARTY WEBSITES
            <br/><br/>
            Our App may contain links to third party websites and services, including those of our partner networks. Please note that these links are provided your convenience and information, and the websites and services may operate independently from us and have their own privacy policies or notices, which we strongly suggest you review. This Privacy Policy applies to Popshow and our App only. We do not accept any responsibility or liability for the policies or practices of any third parties. If you chose to access any websites or services linked from our App, please check the applicable policies before you use or submit any personal data to such website or service.
            <br/><br/>
            INTERPRETATION
            <br/><br/>
            Your use of our App may be governed by our Terms of Use located within the App, the supplemental terms that govern certain of the features, functionality, tools, content and promotions available on or through the App (the "Supplemental Terms"), and any and all policies and rules referenced herein or therein, posted on the App, or otherwise communicated to our Users (the "App Rules"). In the event that the provisions of any such agreement differ from or conflict with the provisions of this Privacy Policy, the terms specific to that feature, functionality, etc. will apply.
            <br/><br/>
            INTERNATIONAL JURISDICTIONS
            <br/><br/>
            The App is hosted in the United States of America and is subject to U.S. state and federal law. If you are accessing our App from other jurisdictions, please be advised that you are transferring your personal information to us in the United States, and by using our App, you consent to that transfer and use of your personal information in accordance with this Privacy Policy. You also agree to abide by the applicable laws of applicable states and U.S. federal law concerning your use of the App and your agreements with us. Any persons accessing our App from any jurisdiction with laws or regulations governing the use of the Internet, including personal data collection, use and disclosure, different from those of the jurisdictions mentioned above may only use the App in a manner lawful in their jurisdiction. If your use of the App would be unlawful in your jurisdiction, you may not use the App.
            <br/><br/>
            CHANGES TO OUR PRIVACY POLICY
            <br/><br/>
            Popshow may, in its sole discretion, change this Privacy Policy from time to time. Any and all changes to this Privacy Policy will be reflected on this page and the effective date will be stated at the top of this Privacy Policy. Unless stated otherwise, our current Privacy Policy applies to all information that we have about you and your account. Users should regularly check this page for any changes to this Privacy Policy. Popshow will always post new versions of the Privacy Policy on the App. However, Popshow may, as determined in its discretion, decide to notify Users of material changes made to this Privacy Policy via email or otherwise. Accordingly, it is important that you always maintain and update your contact information.
            <br/><br/>
            Your continued use of the App or communication with us after the updated Privacy Policy has been posted (or any other indication of your consent) will constitute your acceptance of the updated Privacy Policy.
            <br/><br/>
            Please note that we may condition your continued access to our App on your consent to changes to this Privacy Policy.
            <br/><br/>
            CONTACT US
            <br/><br/>
            If you have questions or comments relating to this Privacy Policy, or if you would like us to update information we have about you or your preferences, please contact us by email at support@onyolo.com.
            <br/><br/>
            </div>
            </Container>
            </Container>
          </Container>
        </div>
      );
    } else {
      return (
        <div>
          <Loading loading background="#0add96" loaderColor="white" />
        </div>
      );
    }
  }
}
