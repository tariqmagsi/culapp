import React, { Component } from "react";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import Loading from "react-fullscreen-loading";
import { Container } from "@material-ui/core";
import "../../css/style.css";

export default class Terms extends Component {
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
          <Container>
            <Container>
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
              Terms Of Service
            </h2>
            <div style={{ fontSize: "28px", marginBottom:"140px" }}>
              Welcome to onyolo.com, the website and online and/or mobile
              service of Popshow, Inc. (“Company,” “we,” or “us”). This page
              explains the terms by which you may use our online and/or mobile
              services, web site, and software provided on or in connection with
              the service (collectively, the “Service”). By accessing or using
              the Service, or by clicking a button or checking a box marked “I
              Agree” (or something similar), you signify that you have read,
              understood, and agree to be bound by these Terms of Service (this
              “Agreement” or “Terms”), our Acceptable Use Policy [link], and to
              the collection and use of your information as set forth in our
              Privacy Policy, whether or not you are a registered user of our
              Service. Company reserves the right to modify these terms and will
              provide notice of these changes as described below. This Agreement
              applies to all visitors, users, and others who access the Service
              (“Users”).
              <br />
              <br /> PLEASE READ THIS AGREEMENT CAREFULLY TO ENSURE THAT YOU
              UNDERSTAND EACH PROVISION. THIS AGREEMENT CONTAINS A MANDATORY
              INDIVIDUAL ARBITRATION AND CLASS ACTION/JURY TRIAL WAIVER
              PROVISION THAT REQUIRES THE USE OF ARBITRATION ON AN INDIVIDUAL
              BASIS TO RESOLVE DISPUTES, RATHER THAN JURY TRIALS OR CLASS
              ACTIONS.
              <br />
              <br />
              1. Our Service
              <br />
              <br />
              1.1 Eligiblity
              <br />
              <br />
              This is a contract between you and Company. You must read and
              agree to these terms before using the Company Service. If you do
              not agree, you may not use the Service. You may use the Service
              only if you can form a binding contract with Company, and only in
              compliance with this Agreement and all applicable local, state,
              national, and international laws, rules and regulations. You
              represent that you are 18 years of age or older or if you are
              under 18 years of age, you are using the Service under the
              supervision of your parent or legal guardian. If you are under 18
              years of age, your parent or legal guardian must first review and
              agree to this Agreement. Any use or access to the Service by
              anyone under 13 is strictly prohibited and in violation of this
              Agreement. The Service is not available to any Users previously
              removed from the Service by Company.
              <br />
              <br />
              1.2 Limited License
              <br />
              <br />
              Subject to the terms and conditions of this Agreement, you are
              hereby granted a non-exclusive, limited, non-transferable, freely
              revocable license to use the Service and as permitted by the
              features of the Service. Company reserves all rights not expressly
              granted herein in the Service and the Company Content (as defined
              below). Company may terminate this license at any time for any
              reason or no
              <br />
              <br />
              1.3 User Accounts
              <br />
              <br />
              Your account on the Service (your “User Account”) gives you access
              to the services and functionality that we may establish and
              maintain from time to time and in our sole discretion. We may
              maintain different types of User Accounts for different types of
              Users. If you open a User Account on behalf of a company,
              organization, or other entity, then (i) “you” includes you and
              that entity, and (ii) you represent and warrant that you are an
              authorized representative of the entity with the authority to bind
              the entity to this Agreement, and that you agree to this Agreement
              on the entity’s behalf. By connecting to Company with a
              third-party service, you give us permission to access and use your
              information from that service as permitted by that service, and to
              store your log-in credentials for that service. You may never use
              another User’s User Account without permission. When creating your
              User Account, you must provide accurate and complete information,
              and you must keep this information up to date. You are solely
              responsible for the activity that occurs on your User Account, and
              you must keep your User Account password secure. We encourage you
              to use “strong” passwords (passwords that use a combination of
              upper and lower case letters, numbers and symbols) with your User
              Account. You must notify Company immediately of any breach of
              security or unauthorized use of your User Account. Company will
              not be liable for any losses caused by any unauthorized use of
              your User Account. By providing Company your email address you
              consent to our using the email address to send you Service-related
              notices, including any notices required by law, in lieu of
              communication by postal mail. We may also use your email address
              to send you other messages, such as changes to features of the
              Service and special offers. If you do not want to receive such
              email messages, you may opt out or change your email preferences.
              Opting out may prevent you from receiving email messages regarding
              updates, improvements, or offers.
              <br />
              <br />
              1.4 Acceptable Use
              <br />
              <br />
              You agree not to engage in any of the following prohibited
              activities: (i) copying, distributing, or disclosing any part of
              the Service in any medium, including without limitation by any
              automated or non- automated “scraping”; (ii) using any automated
              system, including without limitation “robots,” “spiders,” “offline
              readers,” etc., to access the Service in a manner that sends more
              request messages to the Company servers than a human can
              reasonably produce in the same period of time by using a
              conventional on-line web browser (except that Company grants the
              operators of public search engines revocable permission to use
              spiders to copy publically available materials from Company.com
              for the sole purpose of and solely to the extent necessary for
              creating publicly available searchable indices of the materials,
              but not caches or archives of such materials); (iii) transmitting
              spam, chain letters, or other unsolicited email; (iv) attempting
              to interfere with, compromise the system integrity or security or
              decipher any transmissions to or from the servers running the
              Service; (v) taking any action that imposes, or may impose at our
              sole discretion an unreasonable or disproportionately large load
              on our infrastructure; (vi) uploading invalid data, viruses,
              worms, or other software agents through the Service; (vii)
              collecting or harvesting any personally identifiable information,
              including account names, from the Service; (viii) using the
              Service for any commercial solicitation purposes; (ix)
              impersonating another person or otherwise misrepresenting your
              affiliation with a person or entity, conducting fraud, hiding or
              attempting to hide your identity; (x) interfering with the proper
              working of the Service; (xi) accessing any content on the Service
              through any technology or means other than those provided or
              authorized by the Service; or (xii) bypassing the measures we may
              use to prevent or restrict access to the Service, including
              without limitation features that prevent or restrict use or
              copying of any content or enforce limitations on use of the
              Service or the content therein. Accessing any audiovisual content
              that may be available on the Service for any purpose or in any
              manner other than Streaming (as defined below) is expressly
              prohibited unless explicitly permitted by the functionality of the
              Service. “Streaming” means a contemporaneous digital transmission
              of an audiovisual work via the Internet from the Company Service
              to a User’s device in such a manner that the data is intended for
              real-time viewing and not intended to be copied, stored,
              permanently downloaded, or redistributed by the User.
              <br />
              <br />
              1.5 Changes to the Service
              <br />
              <br />
              We may, without prior notice, change the Service; stop providing
              the Service or features of the Service, to you or to Users
              generally; or create usage limits for the Service. We may
              permanently or temporarily terminate or suspend your access to the
              Service without notice and liability for any reason, including if
              in our sole determination you violate any provision of this
              Agreement, or for no reason. Upon termination for any reason or no
              reason, you continue to be bound by this Agreement.
              <br />
              <br />
              1.6 Disputes with Other Users
              <br />
              <br />
              You are solely responsible for your interactions with other Users.
              We reserve the right, but have no obligation, to monitor disputes
              between you and other Users. Company shall have no liability for
              your interactions with other Users, or for any User’s action or
              inaction.
              <br />
              <br />
              1.7 Service Location
              <br />
              <br />
              The Service is controlled and operated from facilities in the
              United States. Company makes no representations that the Service
              is appropriate or available for use in other locations. Those who
              access or use the Service from other jurisdictions do so at their
              own volition and are entirely responsible for compliance with all
              applicable United States and local laws and regulations, including
              but not limited to export and import regulations. You may not use
              the Service if you are a resident of a country embargoed by the
              United States, or are a foreign person or entity blocked or denied
              by the United States government. Unless otherwise explicitly
              stated, all materials found on the Service are solely directed to
              individuals, companies, or other entities located in the United
              States.
              <br />
              <br />
              2. User Content
              <br/><br/>
              Some areas of the Service allow Users to submit, post, display, provide, or otherwise make available content such as profile information, videos, images, music, comments, questions, and other content or information (any such materials a User submits, posts, displays, provides, or otherwise makes available on the Service is referred to as “User Content”). WE CLAIM NO OWNERSHIP RIGHTS OVER USER CONTENT CREATED BY YOU. THE USER CONTENT YOU CREATE REMAINS YOURS. However, you understand that certain portions of the Service may allow other Users to view, edit, share, and/or otherwise interact with your User Content. By providing or sharing User Content through the Service, you agree to allow others to view, edit, share, and/or interact with your User Content in accordance with your settings and this Agreement. Company has the right (but not the obligation) in its sole discretion to remove any User Content that is shared via the Service. By submitting, posting, displaying, providing, or otherwise making available any User Content on or through the Service, you expressly grant, and you represent and warrant that you have all rights necessary to grant, to Company a royalty-free, sublicensable, transferable, perpetual, irrevocable, non- exclusive, worldwide license to use, reproduce, modify, publish, list information regarding, edit, translate, distribute, syndicate, publicly perform, publicly display, and make derivative works of all such User Content and your name, voice, and/or likeness as contained in your User Content, in whole or in part, and in any form, media or technology, whether now known or hereafter developed, for use in connection with the Service and Company’s (and its successors’ and affiliates’) business, including without limitation for promoting and redistributing part or all of the Service (and derivative works thereof) in any media formats and through any media channels. You also hereby grant each User of the Service a non-exclusive license to access your User Content through the Service, and to use, reproduce, distribute, display and perform such User Content as permitted through the functionality of the Service and under this Agreement. You are responsible for procuring: (i) all necessary rights, licenses, consents and clearances, including without limitation any payments to recording artists, music publishers, writers, actors, producers, record labels and all other royalty participants arising from Company’s use and exploitation of the User Content, and (ii) public performance, synchronization, communication to the public, and making available licenses whether controlled by a local collecting society or otherwise, worldwide. You agree to comply with all applicable laws, rules and regulations regarding live streaming of the User Content worldwide. For the purposes of this Agreement, “Intellectual Property Rights” means all patent rights, copyright rights, mask work rights, moral rights, rights of publicity, trademark, trade dress and service mark rights, goodwill, trade secret rights and other intellectual property rights as may now exist or hereafter come into existence, and all applications therefore and registrations, renewals and extensions thereof, under the laws of any state, country, territory or other jurisdiction. In connection with your User Content, you affirm, represent and warrant the following: You have obtained and are solely responsible for obtaining all consents as may be required by law to post any User Content relating to third parties. Your User Content and Company’s use thereof as contemplated by this Agreement and the Service will not violate any law or infringe any rights of any third party, including but not limited to any Intellectual Property Rights and privacy rights. Company may exercise the rights to your User Content granted under this Agreement without liability for payment of any guild fees, residuals, payments, fees, or royalties payable under any collective bargaining agreement or otherwise. To the best of your knowledge, all your User Content and other information that you provide to us is truthful and accurate. You agree not to post User Content that: (i) may create a risk of harm, loss, physical or mental injury, emotional distress, death, disability, disfigurement, or physical or mental illness to you, to any other person, or to any animal; (ii) may create a risk of any other loss or damage to any person or property; (iii) seeks to harm or exploit children by exposing them to inappropriate content, asking for personally identifiable details or otherwise; (iv) may constitute or contribute to a crime or tort; (v) contains any information or content that we deem to be unlawful, harmful, abusive, racially or ethnically offensive, defamatory, infringing, invasive of personal privacy or publicity rights, harassing, humiliating to other people (publicly or otherwise), libelous, threatening, profane, obscene, or otherwise objectionable; (vi) contains any information or content that is illegal (including, without limitation, the disclosure of insider information under securities law or of another party’s trade secrets); (vii) contains any information or content that you do not have a right to make available under any law or under contractual or fiduciary relationships; or (viii) contains any information or content that you know is not correct and current or (ix) violates any school or other applicable policy, including those related to cheating or ethics. You agree that any User Content that you post does not and will not violate third-party rights of any kind, including without limitation any Intellectual Property Rights (as defined below) or rights of privacy. Company reserves the right, but is not obligated, to reject and/or remove any User Content that Company believes, in its sole discretion, violates any of these provisions. You understand that publishing your User Content on the Service is not a substitute for registering it with the U.S. Copyright Office, the Writer’s Guild of America, or any other rights organization. Company takes no responsibility and assumes no liability for any User Content that you or any other User or third party posts, sends, or otherwise makes available over the Service. You shall be solely responsible for your User Content and the consequences of posting, publishing it, sharing it, or otherwise making it available on the Service, and you agree that we are only acting as a passive conduit for your online distribution and publication of your User Content. You understand and agree that you may be exposed to User Content that is inaccurate, objectionable, inappropriate for children, or otherwise unsuited to your purpose, and you agree that Company shall not be liable for any damages you allege to incur as a result of or relating to any User Content.
              <br/><br/>
              3. Our Proprietary Rights
              <br/><br/>
              Except for your User Content, the Service and all materials therein or transferred thereby, including, without limitation, software, images, text, graphics, illustrations, logos, patents, trademarks, service marks, copyrights, photographs, audio, videos, music, and User Content belonging to other Users (the “Company Content”), and all Intellectual Property Rights related thereto, are the exclusive property of Company and its licensors (including other Users who post User Content to the Service). Except as explicitly provided herein, nothing in this Agreement shall be deemed to create a license in or under any such Intellectual Property Rights, and you agree not to sell, license, rent, modify, distribute, copy, reproduce, transmit, publicly display, publicly perform, publish, adapt, edit or create derivative works from any Company Content. Use of the Company Content for any purpose not expressly permitted by this Agreement is strictly prohibited. You may choose to or we may invite you to submit comments or ideas about the Service, including without limitation about how to improve the Service or our products (“Ideas”). By submitting any Idea, you agree that your disclosure is gratuitous, unsolicited and without restriction and will not place Company under any fiduciary or other obligation, and that we are free to use the Idea without any additional compensation to you, and/or to disclose the Idea on a non-confidential basis or otherwise to anyone. You further acknowledge that, by acceptance of your submission, Company does not waive any rights to use similar or related ideas previously known to Company, or developed by its employees, or obtained from sources other than you.
              <br/><br/>
              4. Paid Services
              <br/><br/>
              4.1 Billing Policies
              <br/><br/>
              Certain aspects of the Service may be provided for a fee or other charge. If you elect to use paid aspects of the Service, you agree to our Pricing and Payment Terms, [link], as we may update them from time to time. Company may add new services for additional fees and charges, add or amend fees and charges for existing services, at any time in its sole discretion. Any change to our Pricing or Payment Terms shall become effective in the billing cycle following notice of such change to you as provided in this Agreement.
              <br/><br/>
              4.2 No Refunds
              <br/><br/>
              You may cancel your User Account at any time; however, there are no refunds for cancellation. In the event that Company suspends or terminates your User Account or this Agreement, you understand and agree that you shall receive no refund or exchange for any unused time on a subscription, any license or subscription fees for any portion of the Service, any content or data associated with your User Account, or for anything else.
              <br/><br/>
              4.3 Payment Information
              <br/><br/>
              Taxes. All information that you provide in connection with a purchase or transaction or other monetary transaction interaction with the Service must be accurate, complete, and current. You agree to pay all charges incurred by users of your credit card, debit card, or other payment method used in connection with a purchase or transaction or other monetary transaction interaction with the Service at the prices in effect when such charges are incurred. You will pay any applicable taxes, if any, relating to any such purchases, transactions or other monetary transaction interactions.
              <br/><br/>
              4.4 California Residents
              <br/><br/>
              If you are a California resident, in accordance with Cal. Civ. Code §1789.3, you may report complaints to the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs by contacting them in writing at 1625 North Market Blvd., Suite N 112 Sacramento, CA 95834, or by telephone at (800) 952-5210 or (916) 445-1254.
              <br/><br/>
              5. Text Messaging
              <br/><br/>
              You may sign up to receive certain Company notifications or information, or send or receive invitations to use the Service via text messaging. You may incur additional charges from your wireless provider for these services. You agree that you are solely responsible for any such charges.
              <br/><br/>
              6. Privacy
              <br/><br/>
              We care about the privacy of our Users. You understand that by using the Services you consent to the collection, use and disclosure of your personally identifiable information and aggregate and/or anonymized data as set forth in our Privacy Policy [link], and to have your personally identifiable information collected, used, transferred to and processed in the United States.
              <br/><br/>
              7. Security
              <br/><br/>
              Company uses commercially reasonable physical, managerial, and technical safeguards to preserve the integrity and security of your personal information and implement your privacy settings. However, we cannot guarantee that unauthorized third parties will never be able to defeat our security measures or use your personal information for improper purposes. You acknowledge that you provide your personal information at your own risk.
              <br/><br/>
              8. DMCA Notice
              <br/><br/>
              We have adopted the following policy, in compliance with the Digital Millennium Copyright Act (“DMCA”), to enable, at our sole discretion, the expeditious removal of infringing material and the termination of repeat infringers’ accounts. If you have a good faith belief that your copyright is being infringed by any Content accessible on or through the Application, please send a written notice of claimed infringement, including the information listed below, to our Designated Copyright Agent. Proper notice of claimed infringement must include the following information in writing: An electronic or physical signature of a person authorized to act on behalf of the copyright owner; Identification of the copyrighted work that you claim has been infringed; Identification of the material that is claimed to be infringing and where it is located on the Service; Information reasonably sufficient to permit Company to contact you, such as your address, telephone number, and, e-mail address; A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or law; and A statement, made under penalty of perjury, that the above information is accurate, and that you are the copyright owner or are authorized to act on behalf of the owner. PLEASE NOTE THAT INFORMATION PROVIDED IN THIS LEGAL NOTICE MAY BE FORWARDED TO THE PERSON WHO PROVIDED THE ALLEGEDLY INFRINGING CONTENT. UNDER FEDERAL LAW, IF YOU KNOWINGLY MISREPRESENT THAT ONLINE MATERIAL IS INFRINGING, YOU MAY BE SUBJECT TO CRIMINAL PROSECUTION FOR PERJURY AND CIVIL PENALTIES, INCLUDING MONETARY DAMAGES, COURT COSTS, AND ATTORNEYS’ FEES. AIRTIME TAKES NO RESPONSIBILITY AND ASSUMES NO LIABILITY FOR ANY CONTENT THAT YOU OR ANY OTHER USER OR THIRD PARTY BROADCASTS OR SENDS OVER THE APP. YOU SHALL BE SOLELY RESPONSIBLE FOR YOUR CONTENT AND THE CONSEQUENCES OF POSTING OR PUBLISHING IT, AND YOU AGREE THAT WE ARE ONLY ACTING AS A CONDUIT FOR YOUR ONLINE BROADCAST AND PUBLICATION OF YOUR CONTENT. PLEASE NOTE THAT THIS PROCEDURE IS EXCLUSIVELY FOR NOTIFYING AIRTIME AND ITS AFFILIATES THAT YOUR COPYRIGHTED MATERIAL HAS BEEN INFRINGED. THE PRECEDING REQUIREMENTS ARE INTENDED TO COMPLY WITH AIRTIME’S RIGHTS AND OBLIGATIONS UNDER THE DMCA, INCLUDING 17 U.S.C. §512(C), BUT DO NOT CONSTITUTE LEGAL ADVICE. IT MAY BE ADVISABLE TO CONTACT AN ATTORNEY REGARDING YOUR RIGHTS AND OBLIGATIONS UNDER THE DMCA AND OTHER APPLICABLE LAWS. IN ACCORDANCE WITH THE DMCA AND OTHER APPLICABLE LAW, AIRTIME HAS ADOPTED A POLICY OF TERMINATING, IN APPROPRIATE CIRCUMSTANCES, THE ACCOUNTS OF USERS WHO ARE DEEMED TO BE REPEAT INFRINGERS. AIRTIME MAY ALSO AT ITS SOLE DISCRETION LIMIT ACCESS TO THE APP AND/OR TERMINATE THE ACCOUNTS OF ANY INTELLECTUAL PROPERTY RIGHTS OF OTHERS, WHETHER OR NOT THERE IS ANY REPEAT INFRINGEMENT.
              <br/><br/>
              9. Third-Party Links and Information
              <br/><br/>
              The Service may contain links to third-party materials that are not owned or controlled by Company. Company does not endorse or assume any responsibility for any such third-party sites, information, materials, products, or services. If you access a third-party website or service from the Service or share your User Content on or through any third-party website or service, you do so at your own risk, and you understand that this Agreement and Company’s Privacy Policy do not apply to your use of such sites. You expressly relieve Company from any and all liability arising from your use of any third-party website, service, or content, including without limitation User Content submitted by other Users. Additionally, your dealings with or participation in promotions of advertisers found on the Service, including payment and delivery of goods, and any other terms (such as warranties) are solely between you and such advertisers. You agree that Company shall not be responsible for any loss or damage of any sort relating to your dealings with such advertisers.
              <br/><br/>
              10. Indemnity
              <br/><br/>
              You agree to defend, indemnify and hold harmless Company and its subsidiaries, agents, licensors, managers, and other affiliated companies, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney’s fees) arising from: (i) your use of and access to the Service, including any data or content transmitted or received by you; (ii) your violation of any term of this Agreement, including without limitation your breach of any of the representations and warranties above; (iii) your violation of any third-party right, including without limitation any right of privacy or Intellectual Property Rights; (iv) your violation of any applicable law, rule or regulation; (v) User Content or any content that is submitted via your User Account including without limitation misleading, false, or inaccurate information; (vi) your willful misconduct; or (vii) any other party’s access and use of the Service with your unique username, password or other appropriate security code.
              <br/><br/>
              11. No Warranty
              <br/><br/>
              THE SERVICE IS PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS. USE OF THE SERVICE IS AT YOUR OWN RISK. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE SERVICE IS PROVIDED WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY YOU FROM COMPANY OR THROUGH THE SERVICE WILL CREATE ANY WARRANTY NOT EXPRESSLY STATED HEREIN. WITHOUT LIMITING THE FOREGOING, COMPANY, ITS SUBSIDIARIES, ITS AFFILIATES, AND ITS LICENSORS DO NOT WARRANT THAT THE CONTENT IS ACCURATE, RELIABLE OR CORRECT; THAT THE SERVICE WILL MEET YOUR REQUIREMENTS; THAT THE SERVICE WILL BE AVAILABLE AT ANY PARTICULAR TIME OR LOCATION, UNINTERRUPTED OR SECURE; THAT ANY DEFECTS OR ERRORS WILL BE CORRECTED; OR THAT THE SERVICE IS FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. ANY CONTENT DOWNLOADED OR OTHERWISE OBTAINED THROUGH THE USE OF THE SERVICE IS DOWNLOADED AT YOUR OWN RISK AND YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM OR MOBILE DEVICE OR LOSS OF DATA THAT RESULTS FROM SUCH DOWNLOAD OR YOUR USE OF THE SERVICE. FURTHER, COMPANY DOES NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE SERVICE OR ANY HYPERLINKED WEBSITE OR SERVICE, AND COMPANY WILL NOT BE A PARTY TO OR IN ANY WAY MONITOR ANY TRANSACTION BETWEEN YOU AND THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES. FEDERAL LAW, SOME STATES, PROVINCES AND OTHER JURISDICTIONS DO NOT ALLOW THE EXCLUSION AND LIMITATIONS OF CERTAIN IMPLIED WARRANTIES, SO THE ABOVE EXCLUSIONS MAY NOT APPLY TO YOU. THIS AGREEMENT GIVES YOU SPECIFIC LEGAL RIGHTS, AND YOU MAY ALSO HAVE OTHER RIGHTS WHICH VARY FROM STATE TO STATE. THE DISCLAIMERS AND EXCLUSIONS UNDER THIS AGREEMENT WILL NOT APPLY TO THE EXTENT PROHIBITED BY APPLICABLE LAW.
              <br/><br/>
              12. Limitation of Liability
              <br/><br/>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL COMPANY, ITS AFFILIATES, AGENTS, DIRECTORS, EMPLOYEES, SUPPLIERS OR LICENSORS BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR EXEMPLARY DAMAGES, INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO THE USE OF, OR INABILITY TO USE, THE SERVICE. UNDER NO CIRCUMSTANCES WILL COMPANY BE RESPONSIBLE FOR ANY DAMAGE, LOSS OR INJURY RESULTING FROM HACKING, TAMPERING OR OTHER UNAUTHORIZED ACCESS OR USE OF THE SERVICE OR YOUR ACCOUNT OR THE INFORMATION CONTAINED THEREIN. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, COMPANY ASSUMES NO LIABILITY OR RESPONSIBILITY FOR ANY (I) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT; (II) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO OR USE OF OUR SERVICE; (III) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION STORED THEREIN; (IV) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SERVICE; (V) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE THAT MAY BE TRANSMITTED TO OR THROUGH OUR SERVICE BY ANY THIRD PARTY; (VI) ANY ERRORS OR OMISSIONS IN ANY CONTENT OR FOR ANY LOSS OR DAMAGE INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, EMAILED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE THROUGH THE SERVICE; AND/OR (VII) USER CONTENT OR THE DEFAMATORY, OFFENSIVE, OR ILLEGAL CONDUCT OF ANY THIRD PARTY. IN NO EVENT SHALL COMPANY, ITS AFFILIATES, AGENTS, DIRECTORS, EMPLOYEES, SUPPLIERS, OR LICENSORS BE LIABLE TO YOU FOR ANY CLAIMS, PROCEEDINGS, LIABILITIES, OBLIGATIONS, DAMAGES, LOSSES OR COSTS IN AN AMOUNT EXCEEDING THE AMOUNT YOU PAID TO COMPANY HEREUNDER OR $100.00, WHICHEVER IS GREATER. THIS LIMITATION OF LIABILITY SECTION APPLIES WHETHER THE ALLEGED LIABILITY IS BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR ANY OTHER BASIS, EVEN IF COMPANY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. SOME STATES DO NOT ALLOW THE EXCLUSION OR LIMITATION OF INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE ABOVE LIMITATIONS OR EXCLUSIONS MAY NOT APPLY TO YOU. THIS AGREEMENT GIVES YOU SPECIFIC LEGAL RIGHTS, AND YOU MAY ALSO HAVE OTHER RIGHTS WHICH VARY FROM STATE TO STATE. THE DISCLAIMERS, EXCLUSIONS, AND LIMITATIONS OF LIABILITY UNDER THIS AGREEMENT WILL NOT APPLY TO THE EXTENT PROHIBITED BY APPLICABLE LAW.
              <br/><br/>
              13. Governing Law, Arbitration, and Class Action/Jury Trial Waiver
              <br/><br/>
              13.1 Governing Law
              <br/><br/>
              You agree that: (i) the Service shall be deemed solely based in New York; and (ii) the Service shall be deemed a passive one that does not give rise to personal jurisdiction over us, either specific or general, in jurisdictions other than New York. This Agreement shall be governed by the internal substantive laws of the State of New York, without respect to its conflict of laws principles. Notwithstanding the preceding sentences with respect to the substantive law, any arbitration conducted pursuant to the terms of this Agreement shall be governed by the Federal Arbitration Act (9 U.S.C. §§ 1- 16). The application of the United Nations Convention on Contracts for the International Sale of Goods is expressly excluded. You agree to submit to the personal jurisdiction of the federal and state courts located in New York County, New York for any actions for which we retain the right to seek injunctive or other equitable relief in a court of competent jurisdiction to prevent the actual or threatened infringement, misappropriation or violation of a our copyrights, trademarks, trade secrets, patents, or other intellectual property or proprietary rights, as set forth in the Arbitration provision below, including any provisional relief required to prevent irreparable harm. You agree that New York County, New York is the proper forum for any appeals of an arbitration award or for trial court proceedings in the event that the arbitration provision below is found to be unenforceable.
              <br/><br/>
              13.2 Arbitration
              <br/><br/>
              READ THIS SECTION CAREFULLY BECAUSE IT REQUIRES THE PARTIES TO ARBITRATE THEIR DISPUTES AND LIMITS THE MANNER IN WHICH YOU CAN SEEK RELIEF FROM COMPANY. For any dispute with Company, you agree to first contact us at support@onyolo.com and attempt to resolve the dispute with us informally. In the unlikely event that Company has not been able to resolve a dispute it has with you after sixty (60) days, we each agree to resolve any claim, dispute, or controversy (excluding any claims for injunctive or other equitable relief as provided below) arising out of or in connection with or relating to this Agreement, or the breach or alleged breach thereof (collectively, “Claims”), by binding arbitration by JAMS, under the Optional Expedited Arbitration Procedures then in effect for JAMS, except as provided herein. JAMS may be contacted at www.jamsadr.com. The arbitration will be conducted in New York County, New York, unless you and Company agree otherwise. If you are using the Service for commercial purposes, each party will be responsible for paying any JAMS filing, administrative and arbitrator fees in accordance with JAMS rules, and the award rendered by the arbitrator shall include costs of arbitration, reasonable attorneys’ fees and reasonable costs for expert and other witnesses. If you are an individual using the Service for non-commercial purposes: (i) JAMS may require you to pay a fee for the initiation of your case, unless you apply for and successfully obtain a fee waiver from JAMS; (ii) the award rendered by the arbitrator may include your costs of arbitration, your reasonable attorney’s fees, and your reasonable costs for expert and other witnesses; and (iii) you may sue in a small claims court of competent jurisdiction without first engaging in arbitration, but this does not absolve you of your commitment to engage in the informal dispute resolution process. Any judgment on the award rendered by the arbitrator may be entered in any court of competent jurisdiction. Nothing in this Section shall be deemed as preventing Company from seeking injunctive or other equitable relief from the courts as necessary to prevent the actual or threatened infringement, misappropriation, or violation of our data security, Intellectual Property Rights or other proprietary rights.
              <br/><br/>
              13.3 Class Action/Jury Trial Waiver
              <br/><br/>
              WITH RESPECT TO ALL PERSONS AND ENTITIES, REGARDLESS OF WHETHER THEY HAVE OBTAINED OR USED THE SERVICE FOR PERSONAL, COMMERCIAL OR OTHER PURPOSES, ALL CLAIMS MUST BE BROUGHT IN THE PARTIES’ INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS ACTION, COLLECTIVE ACTION, PRIVATE ATTORNEY GENERAL ACTION OR OTHER REPRESENTATIVE PROCEEDING. THIS WAIVER APPLIES TO CLASS ARBITRATION, AND, UNLESS WE AGREE OTHERWISE, THE ARBITRATOR MAY NOT CONSOLIDATE MORE THAN ONE PERSON’S CLAIMS. YOU AGREE THAT, BY ENTERING INTO THIS AGREEMENT, YOU AND COMPANY ARE EACH WAIVING THE RIGHT TO A TRIAL BY JURY OR TO PARTICIPATE IN A CLASS ACTION, COLLECTIVE ACTION, PRIVATE ATTORNEY GENERAL ACTION, OR OTHER REPRESENTATIVE PROCEEDING OF ANY KIND.
              <br/><br/>
              14. Additional Terms for Mobile Applications
              <br/><br/>
              14.1 Mobile Applications
              <br/><br/>
              We may make available software to access the Service via a mobile device (“Mobile Applications”). To use any Mobile Applications you must have a mobile device that is compatible with the Mobile Applications. Company does not warrant that the Mobile Applications will be compatible with your mobile device. You may use mobile data in connection with the Mobile Applications and may incur additional charges from your wireless provider for these services. You agree that you are solely responsible for any such charges. Company hereby grants you a non-exclusive, non- transferable, revocable license to use a compiled code copy of the Mobile Applications for one Company User Account on one mobile device owned or leased solely by you, for your personal use. You may not: (i) modify, disassemble, decompile or reverse engineer the Mobile Applications, except to the extent that such restriction is expressly prohibited by law; (ii) rent, lease, loan, resell, sublicense, distribute or otherwise transfer the Mobile Applications to any third party or use the Mobile Applications to provide time sharing or similar services for any third party; (iii) make any copies of the Mobile Applications; (iv) remove, circumvent, disable, damage or otherwise interfere with security-related features of the Mobile Applications, features that prevent or restrict use or copying of any content accessible through the Mobile Applications, or features that enforce limitations on use of the Mobile Applications; or (v) delete the copyright and other proprietary rights notices on the Mobile Applications. You acknowledge that Company may from time to time issue upgraded versions of the Mobile Applications, and may automatically electronically upgrade the version of the Mobile Applications that you are using on your mobile device. You consent to such automatic upgrading on your mobile device, and agree that the terms and conditions of this Agreement will apply to all such upgrades. Any third-party code that may be incorporated in the Mobile Applications is covered by the applicable open source or third-party license EULA, if any, authorizing use of such code. The foregoing license grant is not a sale of the Mobile Applications or any copy thereof, and Company or its third-party partners or suppliers retain all right, title, and interest in the Mobile Applications (and any copy thereof). Any attempt by you to transfer any of the rights, duties or obligations hereunder, except as expressly provided for in this Agreement, is void. Company reserves all rights not expressly granted under this Agreement. If the Mobile Applications is being acquired on behalf of the United States Government, then the following provision applies. The Mobile Applications will be deemed to be “commercial computer software” and “commercial computer software documentation,” respectively, pursuant to DFAR Section 227.7202 and FAR Section 12.212, as applicable. Any use, reproduction, release, performance, display or disclosure of the Service and any accompanying documentation by the U.S. Government will be governed solely by these Terms of Service and is prohibited except to the extent expressly permitted by these Terms of Service. The Mobile Applications originates in the United States, and is subject to United States export laws and regulations. The Mobile Applications may not be exported or re-exported to certain countries or those persons or entities prohibited from receiving exports from the United States. In addition, the Mobile Applications may be subject to the import and export laws of other countries. You agree to comply with all United States and foreign laws related to use of the Mobile Applications and the Service.
              <br/><br/>
              14.2 Mobile Applications from Apple App Store
              <br/><br/>
              The following applies to any Mobile Applications you acquire from the Apple App Store (“Apple-Sourced Software”): You acknowledge and agree that this Agreement is solely between you and Company, not Apple, Inc. (“Apple”) and that Apple has no responsibility for the Apple-Sourced Software or content thereof. Your use of the Apple-Sourced Software must comply with the App Store Terms of Service. You acknowledge that Apple has no obligation whatsoever to furnish any maintenance and support services with respect to the Apple- Sourced Software. In the event of any failure of the Apple-Sourced Software to conform to any applicable warranty, you may notify Apple, and Apple will refund the purchase price for the Apple- Sourced Software to you; to the maximum extent permitted by applicable law, Apple will have no other warranty obligation whatsoever with respect to the Apple-Sourced Software, and any other claims, losses, liabilities, damages, costs or expenses attributable to any failure to conform to any warranty will be solely governed by this Agreement and any law applicable to Company as provider of the software. You acknowledge that Apple is not responsible for addressing any claims of you or any third party relating to the Apple-Sourced Software or your possession and/or use of the Apple-Sourced Software, including, but not limited to: (i) product liability claims; (ii) any claim that the Apple-Sourced Software fails to conform to any applicable legal or regulatory requirement; and (iii) claims arising under consumer protection or similar legislation; and all such claims are governed solely by this Agreement and any law applicable to Company as provider of the software. You acknowledge that, in the event of any third-party claim that the Apple-Sourced Software or your possession and use of that Apple-Sourced Software infringes that third party’s intellectual property rights, Company, not Apple, will be solely responsible for the investigation, defense, settlement and discharge of any such intellectual property infringement claim to the extent required by this Agreement. You and Company acknowledge and agree that Apple, and Apple’s subsidiaries, are third-party beneficiaries of this Agreement as relates to your license of the Apple-Sourced Software, and that, upon your acceptance of the terms and conditions of this Agreement, Apple will have the right (and will be deemed to have accepted the right) to enforce this Agreement as relates to your license of the Apple-Sourced Software against you as a third-party beneficiary thereof.
              <br/><br/>
              14.3 Mobile Applications from Google Play Store
              <br/><br/>
              The following applies to any Mobile Applications you acquire from the Google Play Store (“Google-Sourced Software”): (i) you acknowledge that the Agreement is between you and Company only, and not with Google, Inc. (“Google”); (ii) your use of Google-Sourced Software must comply with Google’s then-current Google Play Store Terms of Service; (iii) Google is only a provider of the Google Play Store where you obtained the Google-Sourced Software; (iv) Company, and not Google, is solely responsible for its Google-Sourced Software; (v) Google has no obligation or liability to you with respect to Google-Sourced Software or the Agreement; and (vi) you acknowledge and agree that Google is a third-party beneficiary to the Agreement as it relates to Company’s Google-Sourced Software.
              <br/><br/>
              15. General
              <br/><br/>
              15.1 Assignment
              <br/><br/>
              This Agreement, and any rights and licenses granted hereunder, may not be transferred or assigned by you, but may be assigned by Company without restriction. Any attempted transfer or assignment in violation hereof shall be null and void.
              <br/><br/>
              15.2 Notification Procedures and Changes to the Agreement
              <br/><br/>
              Company may provide notifications, whether such notifications are required by law or are for marketing or other business related purposes, to you via email notice, written or hard copy notice, or through posting of such notice on our website, as determined by Company in our sole discretion. Company reserves the right to determine the form and means of providing notifications to our Users, provided that you may opt out of certain means of notification as described in this Agreement. Company is not responsible for any automatic filtering you or your network provider may apply to email notifications we send to the email address you provide us. Company may, in its sole discretion, modify or update this Agreement from time to time, and so you should review this page periodically. When we change the Agreement in a material manner, we will update the ‘last modified’ date at the top of this page and notify you that material changes have been made to the Agreement. Your continued use of the Service after any such change constitutes your acceptance of the new Terms of Service. If you do not agree to any of these terms or any future Terms of Service, do not use or access (or continue to access) the Service.
              <br/><br/>
              15.3 Entire Agreement/Severability
              <br/><br/>
              This Agreement, together with any amendments and any additional agreements you may enter into with Company in connection with the Service, shall constitute the entire agreement between you and Company concerning the Service. If any provision of this Agreement is deemed invalid by a court of competent jurisdiction, the invalidity of such provision shall not affect the validity of the remaining provisions of this Agreement, which shall remain in full force and effect, except that in the event of unenforceability of the universal Class Action/Jury Trial Waiver, the entire arbitration agreement shall be unenforceable.
              <br/><br/>
              15.4 No waiver
              <br/><br/>
              No waiver of any term of this Agreement shall be deemed a further or continuing waiver of such term or any other term, and Company’s failure to assert any right or provision under this Agreement shall not constitute a waiver of such right or provision.
              <br/><br/>
              15.5 Contact
              <br/><br/>
              Please contact us at support@onyolo.com with any questions regarding this Agreement.
              <br/><br/>
              Law enforcement: lawenforcement@onyolo.com
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
