const language = !!window.localStorage.getItem("language")&&window.localStorage.getItem("language") == "English"?'en':'zh';
let joinus = [
    {
        title: '产品经理',
        content: `岗位职责：
1.研究和了解区块链技术发展动向，参与区块链开放平台的相关产品规划、推进应用场景落地；
2.负责进行产品详细特性规划和产品系统原型设计，并协助研发团队理解和掌握需求；
3.持续做竞品分析、用户分析、数据分析，在运营中不断优化产品。
任职要求：
1.有长期投身区块链应用的热情和兴趣，愿意学习了解区块链协议、加密技术、共识算法、智能合约等基础知识；
2.熟悉互联网产品整体实现过程，包括从需求分析到产品发布。有敏锐的市场洞察能力，严密的逻辑分析能力，良好的沟通协作能力，以及一定的技术理解能力；
3.了解技术结构，对整个区块链市场有认知，包括各个已经发布的区块链优势，以及当前要开发的产品优势；
4.三年及以上互联网产品经验，有行业相关产品经验者优先。`
    }, {
        title: "UI设计师",
        content: `岗位职责：
1.负责金融类产品的视觉设计工作，提供全局的设计方案；
2.负责线上线下推广、销售活动等的创意设计相关工作（平面设计、移动端网页设计）； 
3.参与公司品牌VI与相关视觉体系的规范建设。
任职要求：
1.设计相关专业毕业，1年以上UI设计经验，对UI设计趋势有灵敏触觉和领悟能力；
2.能根据需求文档作出产品原型，对互联网产品风格有独立的见解；
3.熟悉相关交互设计及用户研究方法和工作流程，能够独立支持产品的设计工作；
5.对用户体验、交互操作流程、及用户需求有较深入理解；`
    }, {
        title: '资深Java工程师',
        content: `岗位职责：
1.参与移动端相关项目的需求分析、设计、开发以及优化上线； 
2.完成项目的核心编码，保证系统的开发进度和质量； 
3.发现和解决存在的系统运行过程中的问题；
任职要求：
1.五年以上软件开发经验，三年以上J2EE系统经验；
2.对于大型系统的容错、高并发、低延迟有深刻认识；
3.具有丰富Webservice和Restful API设计经验；
4.精通关系型数据库和NoSQL的设计和选型，比如MySQL，MongoDB等；
5.对开源技术有浓厚兴趣，比如SpringBoot，SpringCloud，Zookeeper等；
6.熟悉JVM工作原理，对JVM调优有丰富的实践经验，熟练使用VisualVM，JMC，DTrace等； 
7.具有互联网分布式项目经验者优先； ，计算机及相关专业本科以上学历。`
    }, {
        title: 'Web前端工程师',
        content: `岗位职责：
1.前端组件的设计和开发；
2.负责前端产品性能和代码优化的实施，确保产品的用户体验；
3.保证快速迭代开发中的速度与质量。
任职要求：
1.计算机相关专业本科及以上学历，五年以上Web产品开发经验；
2.学习能力强，积极主动，具备良好分析问题解决问题的能力；
3.精通angularjs、HTML5/CSS3、vue等技术，熟悉常用的前端框架，并了解其原理。`
    }, {
        title: '金融风控专家',
        content: `岗位职责：
1.负责公司所有业务的风险管理，提供合规风控咨询；
2.审核项目资料的真实合法和准确全面；对项目进行现场调查，完成相应风控报告，并提出建议及可控方案；
3.对风险项目提出风险预警，及时向公司领导报告，并参与风险事件的处置；
4.收集、整理国家及地方相关法律法规，并提出风险管理的合理化建议。
任职要求：
1.金融、经济、财务、法律、会计以及风险管理等相关专业，本科以上学历，五年以上工作经验；
2.有风控、信贷、审计工作经验者优先；
3.对经济、金融、财务、法律等多领域知识以及常见各行业有一定了解，具有较强的分析和学习能力，有风险识别和判断能力；`
    }
]
let copyright = {
    title: "法律声明",
    content: `
第一条
本网站的愿景是为全球数字资产爱好者及投资者提供国际化、专业化的数字资产交易平台和金融产品，前提是不违反新加坡共和国相关法律法规。

第二条
禁止用户利用本网站从事包含商业贿赂、洗钱、走私等在内的一切非法交易行为，一经发现，本网站将冻结相关账户并报送有权机关。

第三条
凡以任何形式登录本网站、直接或间接使用本网站服务的，均视为资源接受本网站声明的约束。

第四条
本网站无任何触犯新加坡共和国法律的事实和动机，如本网站的使用者因违反本法律声明而触犯新加坡共和国相关法律法规的，本网站对于使用者的行为不承担任何连带责任，但本网站有义务对平台服务和运营规则进行相应的完善。

第五条
当有权机关出示相应的调查文件要求本网站配合对其指定的账户进行冻结、划转、查封时或者对指定用户进行调查时，本网站将按照有权机关的要求协助提供相应的用户数据或者其他相关操作。若因此而造成的用户隐私泄露及其他用户损失，本网站将不承担任何责任。

第六条
当本声明与新加坡共和国的法律法规相冲突时，以新加坡共和国的相关法律法规为准，本声明中未涉及的问题请参见新加坡共和国的相关法律法规。`
}

let privacy = {
    title: "隐私条款",
    content: `一、关于双方的定义
1. SUNDAX(Singapore) Technology Group Pte. Ltd.（以下称 “公司”）是一家依据新加坡共和国相关法律法规在新加坡共和国注册成立的公司，该公司运营网站https://www.allwin.world（以下称“本网站”或“网站”），该网站是一个致力于为全球用户提供数字资产交易及相关服务（以下称“该服务”或“服务”）的平台。该公司及该网站在本协议中合称使用“我们”或其他第一人称称呼。
2. 只要登陆该网站的自然人或其他主体均视为本网站的用户，以下使用“阁下”或其他第二人称。
3. 我们与阁下在本协议中合称为“双方”，我们或阁下单称为“一方”。

二、制定隐私政策的的目的
1. 隐私政策规定：我们只通过阁下登陆、注册以及使用我们提供的服务时采集阁下的信息。
2．隐私政策规定：我们采集阁下息的类型。
3．隐私政策规定：我们将如何使用和保护这些采集到的信息。

三、关于阁下的同意
如果阁下详细阅读并且充分理解隐私政策的条文，阁下将对我们如何处理阁下的隐私信息充满信心。
提醒：阁下一旦登陆我们的网站，不论阁下是否在该网站上注册，均表示阁下向我们表明阁下接受、同意、承诺和确认以下内容：
1．阁下会遵守本隐私政策的全部条款和限制；
2．阁下同意日后我们对隐私政策的任何修改；
3．阁下自愿并且同意向我们披露阁下的个人资料；
4．阁下同意我们通过阁下在登陆、注册本网站以及使用我们提供的服务时收集阁下的信息；
5．阁下同意我们的分公司、附属公司、雇员就阁下可能会感兴趣的产品和服务与阁下联络(阁下已经表示不想收到该等讯息除外 )。


四、关于信息的收集
1．如果阁下愿意使用本网站提供的服务，阁下需要填写和提供以下两种信息：
A. 身份信息。
   该信息可以帮助我们验证阁下是否有资格注册为本网站会员， 包括但不限于阁下的名字、阁下的邮寄地址、居住地址、阁下所属国家或政府签发的其他具有证明阁下身份信息的不同的证书以及涉及到的号码及所有其他可帮助我们验证阁下身份的信息（以下合称为“身份信息” ）。
B. 服务信息。
   该信息帮助我们与阁下联系并顺利为阁下提供服务，包括但不限于阁下的电话号码、有效的电子邮件地址、邮寄地址、传真号码以及阁下的借记卡信息或其他帐户信息（以下合 称为“服务信息” ）。
2．当阁下使用本网站时，表示阁下同意我们开始使用cookies来追踪阁下的每一个动作，并收集和记住阁下留下的所有信息，其中包括但不限于阁下的IP地址，地理位置及其他资料。
3． 在阁下使用本网站或其提供的服务时，我们可能会因为以下原因通过本网站公示的专用的邮箱或其他我们认为合规的方式收集更多的、必要的信息：
A． 提升阁下在使用本网站或享受我们提供的服务时的体验以及该过程中安全性；
B.  改进本网站的功能；
C． 根据法院或可适用法律法规或有管辖权的其他政府机构的命令；
4． 如果阁下访问了在本网站上的其他第三方网站或合作的第三方的任何链接，表示阁下同意并遵守该第三方网单独和独立的隐私政策。我们对这些网站或合作方的内容及活动不承担任何责任。

五、关于信息使用的用途
1．  我们使用阁下的信息的方式如下：
A． 通过我们的网站向阁下提供我们的各项服务时；
2．  我们使用阁下的信息的目的如下：
A． 为了当阁下使用我们的网站时, 能辨认及确认阁下的身份；
B． 为了改善和提高网站的服务质量；
C． 统计我们网站使用量的数据
D． 政府机关、事业单位等合作的数据分析；
E． 满足个性化阁下的用户设置及体验
F． 处理交易（阁下的信息，无论是公共或私人的，未经阁下的同意不会以任何理由被出售、交换、转移，或提供给任何其他公司，但除了为完成阁下所要求的交易的明确目的之外 ）；
G． 定期发送电子邮件（阁下提供订单处理的电子邮件地址，除了偶尔接收我们的新闻，更新，相关产品或服务的信息等，可用来向阁下发送信息和更新有关阁下的订单）；
H． 满足本网站用户协议规定的其他目的和为了满足该等目的的所有合法途径。
3．  我们不会向其他方出售、交易或以其他方式转让信息或允许他人收集、使用信息，但不包括以下其他方和以下信息：我们的关联方、帮助我们经营我们的网站、开展业务、或者向阁下提供服务的受信任的第三方，前提是这些当事方同意将这些信息保密；当我们相信披露的信息是适当的，是遵守法律、法规、规章制度的或来自于法院或他主管当局的命令、执行我们的网站策略，正常运行网站所需要，关联方提供服务所需或保护我们或他人的权利、财产或安全的。但是，阁下的信息不会提供给其他方进行营销，广告或其他用途。

六、关于Cookies
1． Cookies所搜集的资料是不记名的集体统计数据, 不载有个人资料。
Cookie常用于记录访问者浏览我们网站上的各个项目时的习惯以及偏好。
2． Cookies不能用于取得阁下的硬盘上的数据、阁下的电邮地址、及阁下的私人数据，其可使本网站或服务商系统识别到阁下的浏览器并捕捉和记忆信息。
3． 当阁下到访我们网站时, 我们通过cookies使用Google Stats去记录我们的业绩以及核对在线广告的效果。只有当阁下使用阁下的电脑进入我们网站时,Cookie才能够被发送到阁下的电脑硬盘上。
4． 大多数浏览器都预设为可以接受Cookies。阁下可以选择将阁下的浏览器设定为不接受Cookies,或如果Cookies一被装上就通知阁下。
5． 阁下若设定浏览器禁止Cookies, 阁下可能无法启动或使用我们网站的某些功能。


七、关于个人资料的保护
1． 我们通过术各方面的措施来保障阁下的个人资料的安全。
我们努力确保通过我们网站所搜集的任何个人资料免于任何与我们无关的第三者的滋扰。
我们采取的安全措施包括但不限于：
A．存有阁下个人资料的电脑数据会被存放在受严格登入限制的电脑系统和存储媒体上。
B．存有阁下个人资料的记录会被存放在安全的、有锁闭装置的地方。
C．采用各种加密技术来输送阁下的个人资料。
D．只有经我们授权的职员才能接触到阁下的个人资料, 这些职员需要遵守我们个人资料保密的内部守则。
E．我们的网络服务器受到“防火墙”的保护。

八、关于隐私政策的修订
1. 我们保留随时修改该隐私政策的权利。
2. 我们通过发布新版本的生效公告通知阁下我们修订了隐私政策，并突出修订处，但这不是我们的一项义务。
3. 阁下应定期查看隐私政策并关注其修订情况，如果阁下不同意修订的内容，阁下应停止立即访问本网站。
4. 当隐私政策的更新版本发布，阁下仍然持续访问本网站则表明阁下同意该更新的内容，并同意遵守该更新的隐私权政策。

九、关于如何与我们沟通
1. 我们只通过本网站上显示的有效的联系方式发布公告和信息或在本网站张贴公告，所以我们对由于阁下信任了未通过以上方式获得的信息而产生的任何损失不承担责任。
2. 如果阁下有任何要求和意见，阁下可以通过电子邮件support@sundax.top，这是唯一有效和官方电子邮件，所以我们对阁下未使用有效的联系方式，任何作为或不作为不承担责任。
3. 若阁下对我们的隐私政策有任何问题, 欢迎随时联系我们。
`
}

let userAgreement = {
    title: "用户协议",
    content: `用户协议
SUNDAX(Singapore) Technology Group Pte. Ltd.（以下称“公司”）是一家依据新加坡共和国相关法律法规在新加坡共和国注册成立的公司，该公司运营网站https://www.allwin.world（以下称“本网站”或“网站”），该网站是一个致力于为全球用户提供数字资产交易及相关服务（以下称“该服务”或“服务”）的平台。网站所有内容，可能提供多个语言版本，若有冲突或遗漏等情况，以中文内容为准。

一、【定义】
1.本协议：指本协议正文、《隐私条款》、《了解你的客户和反洗钱政策》以及网站已经发布的或将来可能发布的各类规则、声明、说明等构成。
2.阁下（或其他第二人称）：登陆该网站的自然人或其他主体，即网站的用户。
3.我们（或其他第一人称）：SUNDAX(Singapore) Technology Group Pte. Ltd及https://www.allwin.world。
4.双方：我们和阁下在本协议中的合称。
5.一方：我们或阁下在本协议中的单称。
6.会员：按照网站要求填写相关信息，并经过其他相关程序后成功注册的用户。

二、【总则】
1.阁下在使用本网站提供的各项服务之前，应仔细阅读本协议。如有不理解之处或其他必要，请咨询专业律师。如阁下不同意本协议及/或随时对其的修改，请阁下立即停止使用网站提供的服务或不再登陆。
2.阁下一旦登陆本网站、使用我们的任何服务或任何其他类似行为即表示阁下已了解并完全同意本协议各项内容，包括网站对本协议随时所做的任何修改。
3.阁下通过按照本网站的要求填写相关信息，并经过其他相关程序后成功注册可以成为我们的会员。在进行注册过程中点击“同意”按钮，即表示阁下以电子签署的形式与公司达成协议；或阁下在使用网站过程中点击任何标有“同意”或类似意思的按钮的行为或以其他本网站允许的方式实际使用我们提供的服务时，均表示阁下完全了解、同意且接受本协议项下的全部条款的约束，无阁下手写的书面签字就本协议对阁下的法律约束力无任何影响。
4.成为本网站的会员后，阁下将获得一个会员帐号和密码，并由会员负责保管；会员应当对以其阁下帐号进行的所有活动和事件负法律责任。
5.只有成为本网站的会员，才可使用我们提供的数字资产交易平台进行交易，享受网站规定的会员服务；会员外的其他人只可使用登陆、浏览网站和其他一些网站规定可获得的服务。
6.通过注册和使用任何由本网站提供的服务和功能，阁下将被视为已阅读、理解并：
(1)接受本协议所有条款及条件的约束。
(2)确认注册时提供的信息是真实和准确的。
(3)保证交易中涉及到的属于阁下的数字资产均为合法取得并所有。
(4)同意为自身的交易或非交易行为承担全部责任和任何收益或亏损。
(5)同意遵守任何有关法律的规定，就税务目的而言，包括报告任何交易利润。
(6)确认阁下已年满十六周岁或根据可适用的法律规定的具有可订立合同的法定年龄。阁下在网站的注册、销售或购买、发布信息等接受网站服务的行为应当符合对阁下有管辖权的主权国家或地区相关法律法规，并有充分的能力接受这些条款，并订立交易，使用本网站进行数字资产交易。
(7)本协议只是就阁下与我们之间达成的权利义务关系进行约束，并不涉及本网站用户之间、其他网站与阁下之间因数字资产交易而产生的法律关系及法律纠纷。

三、【协议修订】
1.我们保留实时修订本协议、并以网站公示的方式进行公告、不再单独通知阁下的权利。变更后的协议会在本协议首页标注变更时间，一经在本网站公布，立即自动生效。
2.阁下应实时浏览及关注本协议的更新时间及变更内容，如阁下不同意相关变更，应当立即停止使用本网站服务；如阁下继续使用本网站服务，即表示阁下接受并同意经修订的协议的约束。

四、【重要提示】
1.数字资产本身不由任何金融机构或公司或网站发行。
2.数字资产市场是全新的、未经确认的，而且可能不会增长。
3.数字资产主要由投机者大量使用，零售和商业市场使用相对较少，并不适合绝大部分人士。
4.数字资产交易存在极高风险，其全天不间断交易，没有涨跌限制，价格容易受庄家、全球政府政策的影响而大幅波动。
5.因各国法律、法规和规范性文件的制定或者修改，数字资产交易随时可能被暂停或被禁止。
6.此外，除了上述提及过的风险以外，还会有未能预测的风险存在。
7.阁下了解和理解此投资有可能导致部分损失或全部损失，所以阁下应以能承受的损失程度来决定投资的金额。阁下了解和理解数字资产会产生衍生风险，所以如有任何疑问，建议先寻求理财顾问的协助。
8.阁下应慎重考虑并用清晰的判断能力去评估自己的财政状况及上述各项风险而做出任何买卖数字资产的决定，并承担由此产生的全部损失。我们对此不承担任何责任。

五、【网站规则】
1.网站唯一官方对外信息公布平台是https://www. allwin.world 。
2.阁下了解本网站仅作为阁下获取数字资产信息、寻找交易方、就数字资产的交易进行协商及开展交易的场所，本网站不参与阁下的任何交易。故阁下应自行谨慎判断确定相关数字资产及/或信息的真实性、合法性和有效性，并自行承担因此产生的责任与损失。
3.本网站的任何意见、消息、探讨、分析、价格、建议和其他资讯均是一般的市场评论，并不构成投资建议。我们不承担任何因依赖该资讯直接或间接而产生的损失，包括但不限于任何利润损失。
4.我们已采取合理措施确保网站资讯的准确性，但并不能保证其准确性程度，亦不会承担任何因本网站上的资讯或因未能链结互联网、传送或接收任何通知和信息时的延误或失败而产生的直接或间接损失。
5.如果公司根据其单方判断认为阁下违反了本协议，或者根据阁下所在管辖区域的法律认为本网站提供的服务或者阁下使用本网站提供的服务的行为是非法的，公司有权随时暂停或终止阁下的账户，或者暂停或终止阁下使用本网站提供的服务或数字资产交易。禁止位于美国的任何人使用本网站提供的服务。
6.本网站任何服务均不接受信用卡支付。
7.禁止使用本网站从事洗钱、走私、商业贿赂等一切非法交易活动。若发现此类事件，网站将采取各种可行手段，包括但不限于冻结账户、通知相关权力机关等。我们不承担由此产生的所有责任，并保留向相关人士追究责任的权利。
8.禁止使用本网站进行恶意操纵市场、不正当交易等一切不道德交易活动。若发现此类事件，网站将对所有恶意操纵价格、恶意影响交易系统等不道德的行为采取警告、限制交易、关停账户等预防性地保护措施，我们不承担由此产生的所有责任并保留向相关人士追究责任的权利。

六、【网站的权利和义务】
1.如阁下不具备本协议约定的注册资格，则本网站有权拒绝阁下的注册；对已注册的，则有权注销阁下的会员账号。网站保留向阁下或阁下的有权代理人追究责任的权利。同时，网站保留其他任何情况下决定是否接受阁下注册的权利。
2.如发现账户使用者并非初始注册人时，本网站有权中止或终止该账户的使用。
3.本网站通过技术检测、人工抽检等检测方式合理怀疑阁下提供的信息错误、不实、失效或不完整时，有权通知阁下更正、更新信息或中止、终止为其提供服务。本网站有权在发现网站上显示的任何信息存在明显错误时，对信息予以更正。
4.本网站保留随时修改、中止或终止服务的权利；行使修改或中止服务的权利不需事先告知阁下；终止一项或多项服务的，自网站发布终止公告之日终止生效。
5.本网站应当采取必要的技术手段和管理措施保障网站的正常运行，并提供必要、可靠的交易环境和服务，维护数字资产交易秩序。
6.如阁下连续一年未使用会员账号和密码登陆本网站，则网站有权注销阁下的账号。账号注销后，网站有权将相应的会员名开放给其他人注册使用。
7.本网站通过加强技术投入、提升安全防范等措施保障阁下的数字资产的安全，有义务在阁下账户出现可以预见的安全风险时提前通知阁下。
8.本网站有权随时删除网站内各类不符合法律法规或网站规定等的内容信息，行使该等权利不需提前通知阁下。
9.本网站有权根据阁下所属主权国家或地区的法律法规、规则、命令等规范的要求，向阁下要求提供更多的信息或资料等，并采取合理的措施以符合当地的规范之要求，阁下有义务配合；本网站有权根据阁下所属主权国家或地区的法律法规、规则、命令等规范的要求，暂停或永久停止对阁下开放网站及其部分或全部服务。

七、【注册】
1.注册资格
阁下确认并承诺：
(1)在完成注册程序或以其他本网站允许的方式实际使用网站提供的服务时，阁下应当是具备可适用的法律规定的可签署本协议及使用本网站服务应具有的能力的自然人、法人或其他组织。
(2)阁下一旦点击同意注册按钮，即表示阁下自身或阁下的有权代理人已经同意该协议内容并由其代理注册及使用本网站服务。若阁下不具备前述主体资格，则阁下及阁下的有权代理人应承担因此而导致的一切后果，且公司保留注销或永久冻结阁下账户，并向阁下及阁下的有权代理人追究责任的权利。
2.注册目的
阁下确认并承诺：
阁下进行本网站注册并非出于违反法律法规或破坏数字资产交易秩序的目的。
3.注册流程
(1)阁下同意根据本网站用户注册页面的要求提供有效电子邮箱、手机号码等信息，阁下可以使用阁下提供或确认的邮箱、手机号码或者网站允许的其它方式登陆进入网站。
(2)按照不同法域相关法律法规的规定，阁下必须提供阁下的真实姓名、身份证件等法律法规及隐私条款及反洗钱条款规定的相关信息并不断更新注册资料，符合及时、详尽、准确的要求。所有原始键入的资料将引用为注册资料。阁下应对该等信息的真实性、完整性和准确性负责，并承担因此产生的任何直接或间接损失及不利后果。
(3)如阁下所在主权国家或地区的法律法规、规则、命令等规范对手机号码有实名要求，阁下同意提供注册的手机号码是经过实名登记的。如阁下不按照规定提供，因此给阁下带来的任何直接或间接损失及不利后果均应由阁下承担。
(4)阁下合法、完整并有效提供注册所需信息并经验证，有权获得本网站账号和密码，阁下获得账号及密码时视为注册成功，可在本网站进行会员登陆。
(5)阁下同意接收本网站发送的与网站管理、运营相关的电子邮件和/或短消息。

八、【服务】
重要声明：
本网站只为阁下通过网站进行数字资产交易活动（包括但不限于数字资产交易等服务）提供网络交易平台服务，并不作为买家或卖家参与买卖数字资产行为本身；本网站不提供任何国家法定货币充入和提取的相关服务。
1.服务内容
(1)阁下有权在本网站浏览数字资产各项产品的实时行情及交易信息、有权通过本网站提交数字资产交易指令并完成数字资产交易。
(2)阁下有权在本网站查看其网站会员账号下的信息，有权应用本网站提供的功能进行操作。
(3)阁下有权按照网站发布的活动规则参与本网站组织的活动。
(4)本网站承诺为阁下提供的其他服务。
2.服务规则 
阁下承诺遵守下列网站服务规则：
(1)阁下同意对阁下的网站的账号、密码下发生的所有活动（包括但不限于信息披露、发布信息、网上点击同意或提交各类规则协议、网上续签协议或购买服务等）承担责任。
(2)阁下应当遵守法律法规并妥善使用和保管其网站账号及登陆密码、资金密码和其注册时绑定的手机号码、以及手机接收的手机验证码的安全。
(3)阁下在未经本网站同意的情况下不得将网站账号以赠与、借用、租用、转让或其他方式处分给他人。
(4)阁下对使用其网站账号和登陆密码、资金密码、手机验证码进行的任何操作和后果承担全部责任。
(5)当阁下发现网站账号、登陆密码、或资金密码、验证码被未经其授权的第三方使用，或存在其他账号安全问题时，应及时有效通知网站，要求网站暂停该账号的服务。
(6)本网站有权在合理时间内对阁下的此类请求采取行动，但对在采取行动前已经产生的后果（包括但不限于阁下的任何损失）不承担任何责任。
(7)阁下应当遵守法律法规、规章、及政策要求的规定，保证账户中所有数字资产来源的合法性。不得在本网站或利用网站服务从事非法或其他损害网站或第三方权益的活动，如发送或接收任何违法、违规、侵犯他人权益的信息，发送或接收传销材料或存在其他危害的信息或言论，未经网站授权使用或伪造网站电子邮件题头信息等。
(8)阁下在本网站进行数字资产交易时不得恶意干扰数字资产交易的正常进行、破坏交易秩序；不得以任何技术手段或其他方式干扰网站的正常运行或干扰其他用户对本网站服务的使用；不得以虚构事实等方式恶意诋毁本网站的商誉。
(9)如阁下因网上交易与其他用户产生纠纷的，不得通过司法或行政以外的途径要求本网站提供相关资料。
(10)阁下在使用本网站提供的服务过程中，所产生的应纳税赋，以及一切硬件、软件、服务及其它方面的费用，均由阁下独自承担。
(11)阁下应当遵守本网站随时发布和更新的本协议以及其他服务条款和操作规则，有权随时终止使用网站提供的服务。
3.产品规则
(1)交易产品规则 
阁下承诺在其进入本网站交易，通过网站与其他用户进行交易的过程中良好遵守如下交易规则：
A.浏览交易信息
阁下在本网站浏览交易信息时，应当仔细阅读交易信息中包含的全部内容，包括但不限于价格、委托量、手续费、买入或卖出方向， 阁下完全接受交易信息中包含的全部内容后方可点击按钮进行交易。
B.提交委托
在浏览完交易信息确认无误之后阁下可以提交交易委托。阁下提交交易委托后，即阁下授权本网站代理阁下进行相应的交易撮合，本网站在有满足阁下委托价格的交易时将会自动完成撮合交易，而无需提前通知阁下。
C.查看交易明细
阁下可通过管理中心的交易明细查看相应的成交记录，确认自己的交易记录详情。
D.撤销/修改委托，在委托未达成交易之前，阁下有权随时撤销或修改委托。

九、【赔偿】
1.在任何情况下，我们对阁下的直接损害的赔偿责任均不会超过阁下从使用本网站服务产生的为期三(3)个月的总费用。
2.如阁下发生违反本协议或其他法律法规等情况，阁下须向我们赔偿至少200万美元及承担由此产生的全部费用（包括律师费等），如不够弥补实际损失，阁下须补全。

十、【寻求禁令救济的权利】
我们和阁下均承认普通法对违约或可能违约情况的救济措施可能是不足以弥补我们遭受的全部损失的，故非违约方有权在违约或可能违约情况下，寻求禁令救济以及普通法或衡平法允许的其他所有的补救措施。

十一、【责任限制与免责】
1.阁下了解并同意，在任何情况下，我们不就以下各事项承担责任：
(1)收入的损失；
(2)交易利润或合同损失；
(3)业务中断；
(4)预期可节省的货币的损失；
(5)信息的损失；
(6)机会、商誉或声誉的损失；
(7)数据的损坏或损失；
(8)购买替代产品或服务的成本；
(9)任何由于侵权（包括过失）、违约或其他任何原因产生的间接的、特殊的或附带性的损失或损害，不论这种损失或损害是否可以为我们合理预见；不论我们是否事先被告知存在此种损失或损害的可能性。
(1)条至(9)条均是彼此独立的。
2.阁下了解并同意，我们不对因下述任一情况而导致阁下的任何损害赔偿承担责任：
(1)我们有合理的理由认为阁下的具体交易事项可能存在重大违法或违约情形；
(2)我们有合理的理由认为阁下在本网站的行为涉嫌违法或不道德；
(3)通过本网站服务购买或获取任何数据、信息或进行交易等行为或替代行为产生的费用及损失；
(4)阁下对本网站服务的误解；
(5)任何非因我们的原因而引起的与本网站提供的服务有关的其它损失。
3.我们对由于信息网络设备维护、信息网络连接故障、电脑、通讯或其他系统的故障、电力故障、天气原因、意外事故、罢工、劳动争议、暴乱、起义、骚乱、生产力或生产资料不足、火灾、洪水、风暴、爆炸、战争、银行或其他合作方原因、数字资产市场崩溃、政府行为、司法或行政机关的命令、其他不在我们可控范围内或我们无能力控制的行为或第三方的原因而造成的不能服务或延迟服务，以及造成的阁下的损失，我们不承担任何责任。
4.我们不能保证网站包含的全部信息、程序、文本等完全安全，不受任何病毒、木马等恶意程序的干扰和破坏。故阁下登陆、使用网站任何服务或下载及使用该下载的任何程序、信息、数据等均是阁下个人的决定，并自行承担风险及可能产生的损失。
5.我们对网站中链接的任何第三方网站的任何信息、产品及业务及其他任何形式的不属于我们的主体的内容等不做任何保证和承诺。阁下如果使用第三方网站提供的任何服务、信息及产品等均为阁下个人决定且承担由此产生的一切责任。
6.我们对于阁下使用网站服务不做任何明示或暗示的保证，包括但不限于网站提供服务的适用性、没有错误或疏漏、持续性、准确性、可靠性、适用于某一特定用途。同时，我们也不对网站提供的服务所涉及的技术及信息的有效性、准确性、正确性、可靠性、质量、稳定、完整和及时性作出任何承诺和保证。是否登陆、使用网站提供的服务是阁下个人的决定且自行承担风险及可能产生的损失。
7.我们对于数字资产的市场、价值及价格等不做任何明示或暗示的保证，阁下理解并了解数字资产市场是不稳定的，价格和价值随时会大幅波动或崩盘，交易数字资产是阁下个人的自由选择及决定且自行承担风险及可能产生的损失。
8.本协议中规定的保证和承诺是由我们就本协议和网站提供的服务的唯一保证和陈述，并取代任何其他途径和方式产生的保证和承诺，无论是书面的或口头的，明示的或暗示的。所有这些保证和陈述仅仅代表我们自身的承诺和保证，并不保证任何第三方遵守本协议中的保证和承诺。
9.我们并不放弃本协议中未提及的在法律适用的最大范围内我们享有的限制、免除或抵销我们损害赔偿责任的任何权利。
10.阁下注册后即表示认可我们按照本协议中规定的规则进行的任何操作，产生的任何风险均由阁下承担。

十二、【协议的终止】
1.本网站有权依据本协议约定注销阁下的网站账号，本协议于账号注销之日终止。
2.本网站有权依据本协议约定终止全部网站服务，本协议于网站全部服务终止之日终止。
3.本协议终止后，阁下无权要求本网站继续向其提供任何服务或履行任何其他义务，包括但不限于要求网站为阁下保留或向阁下披露其原网站账号中的任何信息，向阁下或第三方转发任何其未曾阅读或发送过的信息等。
4.本协议的终止不影响守约方向违约方要求其他责任的承担。

十三、【知识产权】
1.SUNDAX是本网站中所有智力成果(包括但不限于商誉和商标、标志) 的知识产权权利人。网站的一切著作权、商标权、专利权、商业秘密等知识产权及其他合法权益，以及与网站相关的所有信息内容（包括文字、图片、音频、视频、图表、界面设计、版面框架、有关数据或电子文档等）均受法律法规和相应的国际条约保护，SUNDAX享有上述知识产权和合法权益，但相关权利人依照法律规定应享有的权利除外。未经SUNDAX书面同意，阁下不得为商业目的去复制、更改、拷贝、发送或使用下述任何材料或内容：包括但不限于网站标志、数据库、网站设计、文字和图表、软件、照片、录像、音乐、声音及其前述组合，软件编译、相关源代码和软件 (包括小应用程序和脚本) 。
2.阁下登陆本网站或使用网站提供的任何服务，均不视为我们向阁下转让任何知识产权。阁下不得将已发表于网站的信息以任何形式发布或授权其它网站（及媒体）使用。阁下在使用网站服务过程中不得非法使用或处分网站或他人的知识产权权利。
3.阁下接受本协议，即视为阁下主动将其在本网站发表的任何形式的著作权， 包括但不限于：复制权、发行权、出租权、展览权、表演权、放映权、广播权、信息网络传播权、摄制权、改编权、翻译权、汇编权以及应当由著作权人享有的其他可转让权利，无偿独家转让给本网站所有。网站有权利就任何主体侵权单独提起诉讼并获得全部赔偿。 
4.本协议效力及于阁下在网站发布的任何受著作权法保护的作品内容，无论该内容形成于本协议签订前还是本协议签订后。

十四、【信息保护】
1.适用范围
(1)在阁下注册本网站账号或者使用账户时，阁下根据网站要求提供的个人注册信息，包括但不限于电话号码、邮箱信息、身份证件信息。
(2)在阁下使用本网站服务时，或访问网站网页时，网站自动接收并记录的阁下浏览器上的服务器数值，包括但不限于IP地址等数据及阁下要求取用的网页记录。
(3)本网站收集到的阁下在网站进行交易的有关数据，包括但不限于交易记录。
(4)本网站通过合法途径取得的其他阁下个人信息。
2.信息使用
(1)不需要阁下额外的同意，阁下在本网站注册成功即视为阁下同意网站收集并使用其在网站的各类信息，如1.(1)~(4)条所列，阁下了解并同意，网站可以将收集的阁下信息用作包括但不限于下列用途：
A.向阁下提供本网站服务；
B.基于主权国家或地区相关主管部门的要求向相关部门进行报告；
C.在阁下使用网站服务时，本网站将阁下的信息用于身份验证、客户服务、安全防范、诈骗监测、市场推广、存档和备份用途，或与第三方合作推广网站等合法用途，确保网站向阁下提供的产品和服务的安全性；
D.邀请阁下参与有关本网站服务的调查；帮助网站设计新产品及服务，改善网站现有服务目的而进行的信息收集和整理；
E.为了使阁下了解本网站服务的具体情况，阁下同意向其发送营销活动通知、商业性电子信息以及提供与阁下相关的广告以替代普遍投放的广告；
F.本网站为完成合并、分立、收购或资产转让而将阁下的信息转移或披露给任何非关联的第三方；
G.软件认证或管理软件升级；
H.用于和政府机关、公共事务机构、协会等合作的数据分析；
I.用作其他一切合法目的以及经阁下授权的其他用途。
(2)本网站不会向其他任何人出售或出借阁下的个人信息，除非事先得到阁下的许可；也不允许任何第三方以任何手段收集、编辑、出售或无偿传播阁下的个人信息。
(3)本网站对所获得的客户身份资料和交易信息等进行保密，不得向任何单位和个人提供客户身份资料和交易信息，应相关主权国家或地区法律法规、政令、命令等规定要求提供的除外。

十五、【计算】
所有的交易计算结果都经过我们的核实，所有的计算方法都已经在网站上公示，但是我们不能保证本网站的使用不会受到干扰或没有误差。

十六、【出口控制】
阁下理解并承认，根据新加坡共和国相关法律阁下不得将网站上的任何材料（包括软件）出口、再出口、进口或转移，故阁下保证不会主动实施或协助或参与任何上述违反法规的出口或有关转移或其他违反适用的法律和法规的行为；如发现此类情形会向我们积极报告，并协助我们处理。

十七、【转让】
本协议中约定的权利及义务同样约束从该权利义务中获取到利益的各方的受让人、继承人、遗嘱执行人和管理员。阁下不得在我们不同意的前提下转让给任何第三人，但我们可随时将我们在本协议中的权利和义务转让给任何第三人，并给予阁下提前30天的通知。

十八、【可分割性】
如本协议中的任何条款被任何有管辖权的法院认定为不可执行的，无效的或非法的，并不影响本协议的其余条款的效力。

十九、【非代理关系】
本协议中的任何规定均不可被认为创造了、暗示了或以其他方式将我们视为阁下的代理人、受托人或其他代表人，本协议有其他规定的除外。

二十、【弃权】
我们或阁下任何一方对追究本协议约定的违约责任或其他责任的弃权并不能认定或解释为对其他违约责任的弃权；未行使任何权利或救济不得以任何方式被解释为对该等权利或救济的放弃。

二十一、【标题】
所有标题仅供协议表述方便，并不用于扩大或限制该协议条款的内容或范围。

二十二、【适用法律】
本协议全部内容均为新加坡共和国法律订立的合同，其成立、解释、内容及执行均适用新加坡共和国相关法律规定；任何因或与本协议约定的服务有关而产生的索赔或诉讼，都应依照新加坡共和国的法律进行管辖并加以解释和执行。为避免疑义，这一条款明确适用于任何针对我们的侵权索赔。任何针对我们或者是和我们有关的索赔或诉讼的管辖法院或诉讼地均在新加坡共和国。阁下无条件地获得在新加坡共和国法院进行诉讼和上诉的排他性的管辖权。阁下也无条件地同意与本协议款有关的争议或问题或产生的任何索赔请求和诉讼的发生地或法院均排他性得在新加坡共和国，如有网站其他业务对管辖有专门约定从其约定。不方便法院的原则不适用于根据本服务条款的选择的法院。

二十三、【协议的生效和解释】
1.本协议于阁下点击本网站注册页面的同意注册并完成注册程序、获得网站账号和密码时生效，对网站和阁下均具有约束力。
2.本协议的最终解释权归本网站所有。

了解你的客户和反洗钱政策

一、导言：
1.我们保证审慎遵守“了解你的客户和反洗钱”相关的法律法规且不得故意违反该《了解你的客户和反洗钱政策》。在我们合理控制的范围内我们将采取必要的措施和技术为阁下提供安全的服务，尽可能使阁下免于遭受犯罪嫌疑人的洗钱行为带来的损失。
2.我们的“了解你的客户和反洗钱政策”是一个综合性的国际政策体系，包括阁下隶属的不同法律辖区的“了解你的客户和反洗钱政策”。我们健全合规的框架以确保我们在本地和全球层面均符合监管要求和监管水平，并确保网站持续性运行。

二、“了解你的客户和反洗钱政策”如下：
1.颁布“了解你的客户和反洗钱政策”并实时更新以满足相应的法律法规规定的标准；
2.颁布和更新运行网站的一些指导原则和规则，且我们的员工将按照该原则和规则的指导提供服务；
3.设计并完成内部监测和控制交易的程序，如以严格的手段验证身份，安排组建专业团队专门负责反洗钱工作；
4.采用风险预防的方法对客户进行尽职调查和持续的监督;
5.审查和定期检查已发生的交易；
6.向主管当局报告可疑交易；
7.身份证明文件、地址证明文件和交易记录的证明文件将会维持至少六年，如被提交给监管部门，恕不另行通知阁下；
8.整个交易过程中，信用卡被禁止使用。

三、身份信息与核实确认：
1.身份信息
(1)根据不同的司法管辖区的不同规定及不同的实体类型，我们收集的阁下的信息内容可能不一致，原则上将向注册的个人收集以下信息：
A.个人基本信息：阁下的姓名，住址（及永久住址，如果不同）,出生日期及国籍等可获得的其他情况。身份验证应该是根据官方或其他类似权威机构发放的文件，比如护照，身份证或其他不同的辖区要求的和引发的身份证明文件。阁下提供的地址将使用适当的方法进行验证，比如检查乘用交通工具的票据或利率票据或检查选民登记册等。
B.有效的照片：在阁下注册之前，须提供阁下手持身份证明文件于胸前的照片；
C.联系方式：电话/手机号码和/或有效的电子邮件地址。
(2)如果阁下是一个公司或其他合法实体，我们将收集以下信息以确定阁下或信托帐户的最终受益人：
A.公司注册、登记证；
B.公司的章程与备忘录副本；
C.公司的股权机构和所有权说明的详细证明材料，证明决定网站账户的开立以及执行的授权委托人的董事会决议；
D.按照要求需要提供的公司董事、大股东及网站账户有权签字人的身份证明文件；
E.该公司的主要营业地址，如果与公司的邮寄地址不同，提供邮寄地址。
如果公司在本地的地址与它的主要营业地址不一致的，则被视为风险较高的客户，需要提交额外附加文件。
根据不同的司法管辖区的不同规定及不同的实体类型，我们要求的其他认证和权威部门发布的文件以及我们认为必要的文件。
(3)我们只接受英语版本或汉语版本的身份信息，如不是，请阁下将阁下的身份信息翻译成英文版并加以公证。
2.确认核实
(1)我们要求提供阁下全部的身份证明文件。
(2)我们要求提供阁下手持身份证明文件于胸前的照片。
(3)证明文件的副本一般应核和原始凭证进行核对。然而，如果某个可信赖的合适的认证人可证明该副本文件是原始文件准确而全面的复制的，该副本可接受。这样的认证人包括大使、司法委员、地方治安官等。
(4)对识别最终受益人和账户控制权的要求是确定哪些个人最终所有或控制直接客户，和/或确定正在进行的交易是由他人代为执行。
(5)如果最终受益人是企业，则大股东的身份（例如那些持有10％或以上的投票权益）应被验证。一般来说，持股25％会被认定为正常风险内，其股东身份须验证；持股10%或拥有更多的投票权或股票时被认定为高风险的情况，股东身份须验证。

四、监控交易：
1.我们根据安全性和实际交易情况实时设置和调整日常交易和提币最高限额；
2.如果交易频繁集中发生在某个注册用户，或存在超乎合理的情况，我们的专业团队将评估和判定他们是否可疑；
3.经判定为可疑交易的情况，我们可能会采取暂停该交易、拒绝该交易等限制性措施。如果可能将尽快逆转该交易同时向主管部门报告，但不会通知阁下；
4.我们保留拒绝来自于不符合国际反洗钱标准辖区的人或可被视为政治公众人物的人的注册申请，我们保留随时暂停或终止根据我们自身判断为可疑交易的交易，但我们这样做并不违反对阁下的任何义务和责任。`
}


let application = [
    {
        title: '币种上线条件',
        content: `为了最大限度地保护投资者的权益，SUNDAX会提前对申请上线的币种进行资产评估，所有上线交易的币种需要满足如下条件（包含但不限于）：

A．该币种有专业、强力的技术团队进行维护
B．该币种社区有专业、强力的运营团队进行维护
C．该币种项目达到专业及合规的要求且无任何政策风险
D．该币种项目团队能按时、定时、及时披露包含项目白皮书、项目发展报告、项目进度报告在内的项目信息。
E．该币种符合本平台其他的关于币种交易的要求。`
    }, {
        title: "币种下线说明",
        content: `为了最大限度的保护投资者的权益，SUNDAX会保留强制项目下线的权利。
SUNDAX会对强制下线的项目提前5天发出下线公告，用户有30天的期限从钱包中移出资产。
如项目方触发一下条件之一，我们会提前通知并强制项目下线（包含但不限于）：

A．突然出现硬分叉
B．项目面临重大法律问题
C．项目面临重大政策问题
D．项目方公开披露的信息相较事实出现较大误差或信息造假
E．项目突然出现严重的技术问题或安全问题且无法及时解决
F．项目方主动要求下线
G．该项目币种连续7个交易日，每日成交额小于1万美金
I．无法支持继续交易的其他事项`
    }, {
    title: "项目方请通过下方链接提交项目信息",
    content:`https://goo.gl/forms/HmKIe64LUZPfHj703`
    }
]


//法律声明
let copyrightEn = {
        title:"Legal Statement",
        content:`
1. This website provides digital assets fans with professional trading platform and financial products, basing on the premise of obeying relevant laws of the republic of Singapore. 

2. Using this website for illegal trading activities like commercial bribery, money laundering and smuggling is prohibited, this website is entitled to freeze and report such account to competent authority.

3. Anyone who logs into this website or uses the service directly or indirectly shall be deemed as accepting constraint of this statement voluntarily.

4. This website has no fact or motivation for violating laws of Singapore. If users of this website violates the laws of Singapore which violates the legal statement, this website has no liability for any acts of users while it is obliged to improve the service and operation rules.

5. When competent authorities with relevant documents requests the website to cooperate with the investigation to any designated user, or if the account of the user is subject to such measures like freezing, transfer or closure, this website will give assistance by providing relating data of the account user, or other operation if it is required. If there is any disclosure of the user’s privacy or other losses of users, this website assumes no responsibility.
        `
    }
let privacyEn = {
    title:"Privacy Policy",
    content:`1. Parties 
  1.1 SUNDAX Global Limited. (hereinafter referred to as 'the Company') is a company which incorporated in the Republic of Singapore under the laws of Singapore, and operates the website https://www.allwin.world (hereinafter referred to as 'this Website' or 'the Website'), which is a platform dedicated to the trading of digital assets and the provision of related services (hereinafter referred to as 'the Service'). the company and the website are referred to as 'we' collectively or other applicable forms of first person pronouns in this agreement for the convenience of stating in this agreement. 
  1.2 All natural persons or other subjects log onto this website shall be users of us. The users are referred to as 'you' or any other applicable forms of the second-person pronouns for the convenience of wording in this Agreement. 
  1.3You and we are collectively referred to as “both parties”, and individually as “one party” for the convenience of wording in this agreement.
2. Goal of the Privacy Policy 
2.1 We only gather information through your log into this website, registration with the website or use the services we offer.
2.2 The types of your information we collect.
2.3 How we use and protect the information we collect.
3 Your consent 
  You will have full confidence in our handling of private data if you are advised to read and make full sense of the terms of this Privacy Policy. 
  Attention please, you shall be deemed to accept, agree, undertake and confirm the following content once upon you log into our Website, regardless of whether you register with this Website or not. 
  3.1You shall agree with all the terms and limitations of this Privacy Policy;
  3.2You allow the our modification of the Private Policy in the future;
  3.3 You comply with disclosure of your private information to us on the basis of your own free will and your requisite consent. 
3.4 You agree with we may collect your information through your log into this Website,  registration with this Website or your using the Services we offer. 
  3.5 You allow our branches, affiliates and employees may get in touch with you about the products and services that you may be interested in (except you have indicated clearly that you do not want to receive any information from us).
4. Information Collected 
  4.1 If you are willing to use the services offered by us, you will be required to provide and fill in the following two categories of information: 
    4.1.1 Identity Information. 
Such information could help us verify whether you are a qualified member of us. It includes but is not limited to your name, mailing address, residence address, other certificates and corresponding numbers that are issued by your government or country to certify your identity information, including all other information that can help us to verify your identity (hereinafter referred to as 'identity information'). 
    4.1.2 Service information
Such information helps us to keep up with you and provide you with the Service, including but not limited to your valid email address, phone number, fax number and information about your debit card or other accounts (hereinafter collectively referred to as 'service information').
  4.2 When you use this Website, you comply with permitting us to use cookies to track each of your actions and collect and store all your information leaving on this Website, including but not limited to your location, IP address and other personal information. 
  4.3 When you use this Website or the services this Website offers, we may collect more necessary information from our exclusive mailboxes or in other manners that we consider as in compliance with relevant laws and regulations. Resulting from following goals:
4.3.1Enhancing your experience of using services of this Website and the security 
4.3.2Improving the functions of this Website
4.3.3.It is required by any court order, relevant law, administrative regulation or any order of any other competent authorities. 
  4.4 If you visit any of links to third-party websites as are listed on this Website or any links of our third-party partners, you shall comply with and agree to the Privacy Policy of such third party website separately and independently. We has no responsibility for the contents and activities of such websites or the partners.
5. Purposes of Information 
  5.1 We will use your personal information we collect for the following purposes or in the following ways: 
    5.1.1 To identify and confirm your identity while you use our Website; 
    5.1.2 To provide our Services to you through our Website; 
    5.1.3 To statistics data relating to the use of our Website and to be used for data analysis from cooperation with public affairs institutions and government agencies; 
    5.1.4 To improve and upgrade the services of the Website (your information and feedback we received can help us improve the service of the Website, so we can respond to your service requests and support your needs more effectively); 
    5.1.5 To facilitate transactions (your public or private information will not be exchanged, transferred, sold or otherwise provided to any other companies on any situations without your consent, except for completing the transaction you require); 
    5.1.6 To personalize your experience of our services(your information will help us to respond to your unique needs in a better way); 
    5.1.7 To send e-mail regularly (the email address that you provide for handling orders may be used to receive information that we may send to you, like newsletters, updates, related products or services information, etc.) 
    5.1.8 To meet other purposes as specified in the User Agreement of this Website and all legal ways adopted for satisfying such purposes.
  5.2 We do not transfer, sell or trade information or allow other people to collect, use information of users; however, not involve the following parties or information: our related party, trusted third parties which help us provide services to users,  manage our business or operate our websites, provided that such parties agree to keep such information confidential;
  5.2.1 If we do believe disclosure of information is appropriate, or it is required by any of related laws, regulations, rules or by any order of courts or other competent authorities;
  5.2.2If it is necessary for operating the strategy of our Website and ensuring the proper functions of the Website, or it is necessary for the related parties to provide services, or for the protection of the safety, rights, or property of us or other persons. However, your information will not be provided to other parties for advertising, marketing or other purposes.
6. Cookies 
  6.1 Cookies are used to record the preferences and habits of users while browsing the content on our Website usually. The information collected by cookies is collective statistical and non-registered data which does not involve any personal data. 
  6.2 When you browse our Website, we use information via cookies to record our performance and check the effect of online advertising. Cookies are a small amount of data that is sent to your browser, then it will be stored on your computer hard drive. The cookies can be sent to your computer hard drive only when you use your computer to access our Website. 
  6.3 Cookies cannot be used to obtain data on your hard drive, your email address, or your personal data while make it possible the Website or service provider system to recognize your browser and capture and recall information. Most browsers are designed to accept cookies. You can make your browser to reject cookies, or to notify you if you are loaded on cookies as soon as possible. However, if you set your browser to disable cookies, you may not be able to launch or use some functions of our Website.
7. Protection of Personal Data 
  7.1 We safeguard and protect the security of your private information through several kinds of technical measures. We make sure any personal data collected through our Website will be far away from being subject to disturbance by any third party unrelated to us to the greatest extent possible. The security measures that we will take include but are not limited to: 
    7.1.1The data which contain your personal information will be stored in computer systems and storage medias which are protected by strict login restrictions. 
    7.1.2 Records with your private data will be stored in a properly place locked. 
    7.1.3 Such encryption techniques will be used to convey your private data. 
    7.1.4 Only employees of us duly authorized by us can access your personal data, and these employees shall agree with our privacy policy.
    7.1.5 Our network servers are protected by proper 'firewall '.
  7.2 If you are realize there are any security flaws in our Website, please contact us immediately so that we can take appropriate measures as quickly as possible. 
  7.3 Even though we have the above-mentioned technical and security measures, we cannot make sure that the information transmitted through the Internet is definitely safe, so we cannot absolutely guarantee that the private data that you provide to us through our Website will be safe at any time. We are not responsible for any loss or damage caused by or arising from any event that may occur in connection with unauthorized access to your private data, and we are not responsible for compensation for such damage or loss.
8 Modification to the Privacy Policy 
1. We reserve the right to modify the Privacy Policy from time to time and at any time. 
2. We will inform you of the modifications of the Privacy Policy by updating and publishing the effective date of the release of new versions hereof and highlighting the amendments. However, it is not an obligation for us to inform you of the modification made in the Privacy Policy. 
3. You shall review the Privacy Policy regularly and focus on its modifications, and if you do not agree with such modifications, you shall immediately stop using this Website. 
4. When an updated version of this Privacy Policy is released, your continued visit to this Website shall show and indicate that you agree to the update and agree to comply with the updated Privacy Policy.
9 Communication with Us 
9.1 We only publish announcements and information on the basis of the valid and effective contact information on this Website or post announcements on this Website; So, we have no responsibility for any loss arising from your trust in the information that has not been obtained through the above-mentioned means.  
9.2 If you have any comments and requests, you can send an email to support@sundax.top, which is the only official and valid email through which we keep in touch with you, so we will not undertake any liability for your failure to using effective contact information, any act or omission. 
9.3 If you have any questions about our Privacy Policy, you are welcome to keep up with us at any time.`
}

let applicationEn = [
    {
        title:"Submission",
        content:`To protect the right of investors extremely, SUNDAX is looking for tokens to be deployed if you could meet conditions, including but not limited to
    Well maintained by a team with practical technology
    High demanded and well managed by a strong and professional team
    Meet the regulatory requirements without political risk
    Status report and whitepaper must be submitted on time
    Other requirements needed
        `
    },
    {
        title:"Removal Policy",
        content:`To protect the right of investors who're trading on SUNDAX platform, we reserve the right to keep or eliminate any token from our exchange, including but not limited to:
    Fork without notifying in advance
    The project’s facing significant legal issues
    The project’s facing significant policy issues
    Selectively value-relevant information communicated to the exchange or fraud
    Security issue or technical issue which could not be solved
    Operation team of project requested for removal from the exchange 
    Daily volume less than 10 thousands US dollars in 7 consecutive days  
    Daily volume less than 120 thousands US dollars in 30 consecutive days                                                                                                                    
    Any other matters that do not meet the requirements of continuing trading.
        `
    },
    {
        title:"Please submit the project information through the link below",
        content:`https://goo.gl/forms/HmKIe64LUZPfHj703`
    }
]

let userAgreementEn = {
    title:"Terms of User",
    content:`SUNDAX(Singapore) Technology Group Pte.Ltd.(hereinafter referred to as "the company") is a company incorporated in Singapore under the laws of tSingapore, and operates the website https://www.allwin.world (hereinafter referred to as "this Website" or "the Website")，which is a platform dedicated to the transaction of digital assets and the provision of related services (hereinafter referred to as "the Service"). All content on this Website may be available in multiple languages. In case of any conflict between different language versions of such content or any omission in any language version，the Chinese version shall prevail.

1.【Definition】
1.1 This Agreement：consists of the main body, Terms of Privacy, Understanding Your client and Anti-money-laundering Policy, as well as any rules, statements, instructions, etc. that this Website has published or may publish in the future.
1.2 Your Mightiness(or any other applicable forms of the second-person pronouns):the users，natural person or other subject logging into the site
1.3 We (or any other applicable forms of the first-person pronouns): SUNDAX(Singapore) Technology Group Pte.Ltd. 及 https://www.allwin.world 
1.4 Both Parties：you and us are collectively in the agreement
1.5 One Party：you and us are individually in the agreement
1.6 Member:users who have filling in the relevant information in accordance with the requirements of this Website, and have sucessfully registered after going through other relevant procedures

2.【General Provisions】
2.1 Before using the services offered by this Website, you shall read this Agreement carefully, and consult a professional lawyer if you have any doubt or as may be otherwise necessary. If you do not agree to the terms and conditions of this Agreement and/or any change made thereto from time to time , please immediately stop using the service provided by this Website or stop logging onto it. 
2.2 Upon your logging into this Website or using any service offered by this Website or engaging in any other similar activity, it shall be deemed as having understood and fully agreeing to all terms and conditions of this Agreement, including any and all changes, modifications or alterations that this Website may make to this Agreement from time to time .
2.3 In the process of registration, if you click on the "I Agree", it shall be deemed that you have reached an agreement with the Company by way of electronic signature; or when you use this Website, you click on the "I Agree" button or a similar button, or if you use the services offered by this Website in any of the ways allowed by this Website, it shall be deemed that you fully understand, agree to and accept all the terms and conditions under this Agreement, and in this case, the absence of your handwritten signature will not affect the legal binding force that this Agreement may have on you.
2.4 After you become a member of this Website, you will receive a member account and corresponding password, which shall be properly kept by you as a member of this Website; Members shall be liable for all activities and events carried out through their accounts.
2.5 You cannot engage in trading on the digital asset trading platform provided by this Website and gain access to the services that are exclusively available to members in accordance with the rules and regulations of this Website, unless and until you become a member of this Website; if you are not a member of this Website, you can only log in to and browse the Website and have access to other services as are permitted by the rules and regulations of this Website.
2.6 Upon registering yourself as a member of this Website and using any of the services and functions offered by this Website, it shall be deemed that you have read, understood this Agreement, and:
2.6.1 You accepted to be bound by all terms and conditions of this Agreement.
2.6.2 You confirm that the information provided at the time of registration is true and accurate.
2.6.3 You undertake that all your digital assets involved in transactions hereunder are legally acquired and owned by you.
2.6.4 You agree to undertake any and all liabilities for your own transaction and non-transaction activities as well as any and all profits and losses therefrom.
2.6.5 You agree to comply with any and all relevant laws, including the reporting of any transaction profits for tax purposes.
2.6.6 You confirm that you have attained the age of 16, or another statutory age for entering into contracts as is required by a different applicable law, and your registration with this Website, purchase or sale via this Website, release information on this Website and other behaviors indicating your acceptance of the Services offered by this Website shall comply with the relevant laws and regulations of the sovereign state or region that has jurisdiction over you, and you confirm that you have sufficient capacity to accept these terms and conditions, enter into transactions and to use this Website for digital asset transactions.
2.6.7 This Agreement is only binding on the rights and obligations between you and us, and does not involve legal relations and legal disputes arising from and relating to the transaction of digital assets between the users of this Website, and between other websites and you.

3.【Amendment of this Agreement】
3.1 We reserve the right to amend this Agreement from time to time, and disclose such amendment by way of announcement on the Website without sending a separate notice to you on your rights. The date when the amendment is made will be indicated on the first page of the amended agreement. The amended agreement will take effect immediately upon announcement on the Website. 
3.2 You shall browse this Website from time to time and follow information on the time and content of amendments, if any, made to this Agreement. If you do not agree with the amendments, you shall stop using the services offered by this Website immediately; if you continue to use the services , it shall be deemed that you accept and agree to be bound by the amended agreement.

4.【Important reminder】
4.1 The digital assets themselves are not offered by any financial institution，corporation or this Website;
4.2 The digital asset market is new and unconfirmed, and will not necessarily expand;
4.3 Digital assets are primarily used by speculators, and are used relatively less on retail and commercial markets，therefore not suitable for the vast majority of people;
4.4 digital asset transactions are highly risky, due to the fact that they are traded throughout the day without limits on the rise or fall in price, and market makers and global government policies may cause major fluctuations in their prices;
4.5 Digital asset transactions may be suspended or prohibited at any time due to the enactment or modification of national laws, regulations and regulatory documents.
4.6 Furthermore, aside from the above-mentioned risks, there may also be unpredictable risks. 
4.7 You acknowledge and understand that investment in digital assets may result in partial or total loss of your investment and therefore you are advised to decide the amount of your investment on the basis of your loss-bearing capacity. You acknowledge and understand that digital assets may generate derivative risks. Therefore, if you have any doubt, you are advised to seek assistance from a financial adviser first.
4.8 You are advised to carefully consider and use clear judgment to assess your financial position and the above-mentioned risks before making any decisions on buying and selling digital assets; any and all losses arising therefrom will be borne by you and we shall not be held liable in any manner whatsoever.

5.【Website Rules】
5.1 https://www.allwin.world is the sole official external information release platform for this Website.
5.2 You understand that this Website is only intended to serve as a venue for you to obtain digital asset information, find trading counterparties, hold negotiations on and effect transactions of digital assets. This Website does not participate in any of your transactions, and therefore you shall, at your sole discretion, carefully assess the authenticity, legality and validity of relevant digital assets and/or information, and solely bear the responsibilities and losses that may arise therefrom.
5.3 All opinions, information, discussions, analyses, prices, advice and other information on this Website are general market reviews and do not constitute any investment advice. We do not bear any loss arising directly or indirectly from reliance on the above-mentioned information, including but not limited to, any loss of profits.
5.4 We have taken reasonable measures to ensure the accuracy of the information on the Website; however, we do not guarantee the degree of such accuracy, or bear any loss arising directly or indirectly from the information on this Website or from any delay or failure caused by failure to link up with the internet, transmit or receive any notice and information
5.5 The Company may suspend or terminate your account or use of the Service, or the processing of any digital asset transaction, at any time if it determines in its sole discretion that you have violated this Agreement or that its provision or your use of the Service in your jurisdiction is unlawful. USE OF THE SERVICE BY PERSONS LOCATED IN THE UNITED STATES OF AMERICA IS PROHIBITED.
5.6 No service on this Website may be paid for by credit card.
5.7 It is prohibited to use this Website to engage in any illegal transaction activities, such as money laundering, smuggling and commercial bribery. In the event that any of such activities is uncovered, this Website will adopt all available measures, including but not limited to freezing the offender's account, notifying relevant authorities, etc., and we will not assume any of the responsibilities arising therefrom and reserve the right to hold relevant persons accountable.
5.8 It is prohibited to use this Website for the purpose of malicious manipulation of the market, improper transactions or any other illicit trading activities. Where any of such illicit trading activities is uncovered, this Website will adopt such preventive and protective measures as warning, restricting trading and closing accounts against any and all such malicious manipulation of prices, maliciously influencing the trading system and any other illicit behaviors; we do not assume any of the responsibilities arising therefrom and reserve the right to hold relevant persons accountable.

6.【Rights and Obligations of this Website】
6.1 If you do not have the registration qualifications agreed on in this Agreement, this Website shall have the right to refuse to allow you to register; if you have already registered, this Website shall have the right to revoke your member account, and this Website reserves the right to hold you or your authorized agent accountable. Furthermore, this Website reserves the right to decide whether to accept your application for registration under any other circumstances.
6.2 When this Website finds out that the user of an Account is not the initial registrant of that Account, it shall have the right to suspend or terminate the user's access to that Account.
6.3 Where by means of technical testing or manual sampling, among others, this Website reasonably suspects that the information you provide is wrong, untrue, invalid or incomplete, this Website shall have the right to notify you to correct or update the information, or suspend or terminate its supply of the services to you.This Website shall have the right to correct any information displayed on this Website when it uncovers any obvious error in such information.
6.4 This Website reserves the right to modify, suspend or terminate the Services offered by this Website, at any time, and the right to modify or suspend the Service without prior notice to you; if this Website terminates one or more of the Services offered by this Website, such termination by this Website will take effect on the date of announcement of such termination on the Website.
6.5 This Website shall take necessary technical means and management measures to ensure the normal operation of this Website, and shall provide a necessary and reliable trading environment and transaction services, and shall maintain the order of digital assets trading.
6.6 If you fail to log into this Website using your member account number and password for an uninterrupted period of one year, this Website shall have the right to revoke your account. After your account is revoked, this Website shall have the right to offer the member name represented by such account to other applicants for membership.
6.7 This Website shall ensure the security of your digital assets by strengthening technical input and enhancing security precautions, and is under the obligation to notify you in advance of the foreseeable security risks in your account.
6.8 This Website shall have the right to delete all kinds of content and information which does not conform to laws and regulations or the rules of this Website at any time, and exercise of this right by this Website is not subject to a prior notice to you.
6.9 This Website shall have the right to, in accordance with the applicable laws, administrative regulations, rules, orders and other regulatory documents of the sovereign country or region where you are based, request to you for more information or data, and to take reasonable measures to meet the requirements of the local standards, and you have the obligation to provide proper assistance to such measures; this Website shall have the right to suspend or permanently terminate your access to this Website as well as part or all of the services offered by this Website.

7.【Registration】
7.1Eligibility for Registration 
You confirm and promise that: 
7.1.1 you shall be a natural person, legal person or other organization with the ability to sign this Agreement and the ability to use the services of this Website, as is provided by applicable laws, when you complete the registration process or when you use the services offered by this Website in any other manner as is otherwise permitted by this Website. 
7.1.2 Upon clicking on the button indicating that you agree to register, it shall be deemed that you yourself or your authorized agent agrees to the content of this Agreement and your authorized agent will register with this Website and use the services offered by this Website on your behalf. If you are not a natural person, legal person or organization with the abovementioned ability, you and your authorized agent shall bear all the consequences of that, and the company reserves the right to cancel or permanently freeze your account and to hold you and your authorized agent accountable.
7.2 Purpose of Registration：
You confirm and promise that you do not register with this Website for the purpose of violating any of the applicable laws or regulations or undermining the order of digital asset transactions on this Website.
7.3 Registration Process
7.3.1 You agree to provide a valid email address, a mobile phone number and other information in accordance with the requirements on the user registration page of this Website. You can use the email address, mobile phone number or any other manner permitted by this Website to log in to this Website. 
7.3.2 In accordance with the requirements of applicable laws and regulations of relevant jurisdictions, you shall provide your real name, identity card and other information required by applicable laws, regulations, the Terms of Privacy, and anti-money-laundering terms, and constantly update your registration data so that they will be timely, detailed and accurate as is required. All of the original typed data will be referenced as registration information. You shall be responsible for the authenticity, integrity and accuracy of such information and bear any direct or indirect loss and adverse consequences arising out of it.
7.3.3 If any of the applicable laws, regulations, rules, orders and other regulatory documents of the sovereign country or region in which you are based requires that mobile phone accounts must be based on real names, you hereby confirm that the mobile phone number you provide for registration purposes has gone through the real-name registration procedure. If you cannot provide such a mobile phone number as is required, any direct or indirect losses and adverse consequences arising therefrom and affecting you shall be borne by you.
7.3.4 After you provide the required registration information in a legal, complete and valid manner and such information passes relevant verification, you shall have the right to obtain an account and a password of this Website. Upon obtaining such account and password, your registration shall be deemed as successful and you can log into this Website as a member thereof.
7.3.5 You agree to receive emails and/or short messages sent by this Website related to the management and operation thereof.

8.【Services 】
【Important reminder】 
This Website only provides online transaction platform services for you to engage in digital asset trading activities through this Website (including but not limited to the digital asset transactions etc.). This Website does not participate in the transaction of digital assets as a buyer or seller; This Website does not provide any services relating to the replenishment and withdrawal of the legal currency of any country.
8.1 【Content of Services】
8.1.1 You have the right to browse the real-time quotes and transaction information of digital asset products on this Website, to submit digital asset transaction instructions and to complete the digital asset transaction through this Website.
8.1.2 You have the right to view information under the member accounts on this Website and to apply the functions provided by this Website.
8.1.3 You have the right to participate in the website activities organized by this Website in accordance with the rules of activities posted on this Website.
8.1.4 Other services that this Website promises to offer to you.
8.2【Service Rules】
You undertake to comply with the following service rules of this Website:
8.2.1 You agree to take responsibility for all activities (including but not limited to information disclosure, information release, online click-approving or submission of various agreements on rules, online renewal of agreements or purchase service) using your account and password with this Website.
8.2.2 You shall comply with applicable laws and regulations and properly use and keep your account in this Website and login password, password of your financial transactions, and the mobile phone number bound with your account that you provide upon registration of your account, as well as the security of the verification codes received via your mobile phone. 
8.2.3 You may not assign your account with this Website to any other person by way of donation, lending, leasing, transfer or otherwise without the consent of this Website.
8.2.4 You shall be solely responsible for any and all your operations carried out using your account with this Website and login password, financial transaction password, verification codes sent to your mobile phone, as well as all consequences of such operations. 
8.2.5 When you find that your account with this Website, your login password, financial transaction password, or mobile phone verification codes is used by any unauthorized third party, uncover any other problem relating to the security of your account, you shall inform this Website in a prompt and effective manner, and request this Website to temporarily suspend the services to your account with this Website. 
8.2.6 This Website shall have the right to take action on your request within a reasonable time; nonetheless, this Website does not bear any liability for the consequences that have arisen before such action is taken, including but not limited to any loss that you may sustain. 
8.2.7 You shall comply with the provisions of applicable laws, regulations, rules, and policy requirements, and ensure the legality of the source of all digital assets in your account and shall refrain from engaging in any illegal activities or other activities that damages the rights and interests of this Website or any third party, such as sending or receiving information that is illegal, illicit or infringes on the rights and interests of any other person, sending or receiving pyramid scheme information or information or remarks causing other harms, unauthorized use or falsification of the email header information of this Website, inter alia.
8.2.8 In your digital asset transactions on this Website, you may not maliciously interfere with the normal proceeding of the digital asset transaction or disrupt the transaction order; you may not use any technical means or other means to interfere with the normal operation of this Website or interfere with the other users' use of the services; you may not maliciously defame the business goodwill of this Website on the ground of falsified fact.
8.2.9 If any dispute arises between you and any other user in connection with online transaction, you may not resort to any means other than judicial or governmental means to request this Website to provide relevant information.
8.2.10 All taxes payable as well as all fees relating to hardware, software and services that are incurred by you in the course of using the services provided by this Website shall be solely borne by you.
8.2.11 You shall abide by this Agreement and other terms of service and operating rules that this Website may release from time to time, and you have the right to terminate your use of the services provided by this Website at any time.
8.3 【Product Rules】
8.3.1 Rules for trading products You undertake that in the process in which you log into this Website and engage in transactions with other users through this Website, you will properly comply with the following transaction rules.
8.3.1.1 Browsing transaction information 
When you browse the transaction information on this Website, you should carefully read all the content in the transaction information, including but not limited to the price, consignment, handling fee, buying or selling direction, and you shall accept all the contents contained in the transaction information before you may click on the button to proceed with the transaction.
8.3.1.2 Submission of Commission 
After browsing and verifying the transaction information, you may submit your transaction commissions. After you submit the transaction commission, it shall be deemed that you authorize this Website to broker you for the corresponding transactions, and this Website will automatically complete the matchmaking operation when there is a transaction proposal that meets your price quotation, without prior notice to you.
8.3.1.3 Accessing transaction details 
You can check the corresponding transaction records in the transaction statements by the Management Center, and confirm your own detailed transaction records.
8.3.1.4 Revoking/modifying transaction commission
You have the right to revoke or modify your transaction commission at any time before the transaction is concluded.

9.【Indemnity】
9.1 Under any circumstance, our liability for your direct damage will not exceed the total cost incurred by your three (3) months' use of services offered by this Website.
9.2 Shall you breach this Agreement or any applicable law or administrative regulation, you shall pay to us at least US$ Two million in compensation and bear all the expenses in connection with such breach (including attorney's fees, among others). If such compensation cannot cover the actual loss, you shall make up for the difference.

10.【The Right to Injunctive Relief】
    Both you and we acknowledge that common law remedies for breach of agreement or possible breach of contract may be insufficient to cover all the losses that we sustain; therefore, in the event of a breach of contract or a possible breach of contract, the non-breaching party shall have the right to seek injunctive relief as well as all other remedies that are permitted under common law or equity.
11.【Limitation and Exemption of Liability】
11.1 You understand and agree that under no circumstance will we be held liable for any of the following events:
11.1.1 loss of income
11.1.2 loss of transaction profits or contractual losses
11.1.3 disruption of the business
11.1.4 loss of expected currency losses
11.1.5 loss of information
11.1.6 loss of opportunity, damage to goodwill or reputation
11.1.7 damage or loss of data;
11.1.8 cost of purchasing alternative products or services
11.1.9 any indirect, special or incidental loss or damage arising from any infringement (including negligence), breach of contract or any other cause, regardless of whether or not such loss or damage may reasonably be foreseen by us, and regardless of whether or not we are notified in advance of the possibility of such loss or damage.
（ Items 11.1.1 to 11.1.9 are independent of each other.）
11.2 You understand and agree that we shall not be held liable for any damages caused by any of the following events:
11.2.1 Where we are properly justified in believing that your specific transactions may involve any serious violation or breach of law or agreement;
11.2.2 Where we are reasonably justified in believing that your conduct on this Website is suspected of being illegal or immoral;
11.2.3 The expenses and losses arising from the purchase or acquisition of any data, information or transaction, etc. through the services offered by this Website;
11.2.4 Your misunderstanding of the Services offered by this Website;
11.2.5 Any other losses related to the services provided by this Website, which cannot be attributed to us.
11.3 Where we fail to provide the Services or delay in providing such Services due to information network equipment maintenance, information network connectivity failures, errors in computer, communications or other systems, power failures, weather conditions, unexpected accidents, industrial actions, labor disputes, revolts, uprisings, riots, lack of productivity or production materials, fires, floods, storms, explosions, wars, failure on the part of banks or other partners, collapse of the digital asset market, actions by government, judicial or administrative authorities, other acts that are not within our control or beyond our inability to control, or due to causes on the part of third parties, we shall not assume any responsibility for such failure to provide service or delay in providing services, or for the resultant loss you may sustain as a result of such failure or delay.
11.4 We cannot guarantee that all the information, programs, texts, etc. contained in this Website are completely safe, free from the interference and destruction by any malicious programs such as viruses, trojans, etc., therefore, your log-into this Website or use of any services offered by this Website, download of any program, information and data from this Website and your use thereof are your personal decisions and therefore you shall bear the any and all risks and losses that may possibly arise.
11.5 We do not make any warranties and commitments in connection with any of the information, products and business of any third party websites linked to this Website, as well as any other forms of content that do not belong to us; your use any of the services, information, and products provided by a third party website is your personal decision and therefore you shall assume any and all the responsibilities arising therefrom.
11.6 We do not make any explicit or implicit warranties regarding your use of the Services offered by this Website, including but not limited to the applicability, freedom from error or omission, consistency, accuracy, reliability, and applicability to a specific purpose, of the services provided by this Website. Furthermore, we do not make any commitment or guarantee in connection with the validity, accuracy, correctness, reliability, quality, stability, integrity and timeliness of the technology and information covered by the services offered by this Website. Whether to log in this Website or use the services provided by this Website is your personal decision and therefore you shall bear all the risks and possible losses arising from such decision.
11.7 We do not make any explicit or implicit warranties in connection with the market, value and price of digital assets; you understand and acknowledge that the digital asset market is unstable, that the price and value of assets may fluctuate or collapse at any time, and that the transaction of digital assets is based on your personal free will and decision and therefore you shall assume any and all risks and losses that may possible arise therefrom.
11.8 The guarantees and undertakings specified in this Agreement shall be the only guarantee and statements that we make in connection with the Services provided by us under this Agreement and through this Website, and shall supersede any and all the warranties and commitments arising in any other way and manner, whether in writing or in words, express or implied. All these guarantees and statements represent only our own commitments and undertakings and do not guarantee any third party's compliance with the guarantees and commitments contained in this Agreement.
11.9  We do not waive any of the rights not mentioned in this Agreement and to the maximum extent permitted by the applicable law, to limit, exempt or offset our liability for damages.
11.10 Upon your registration of your account with this Website, it shall be deemed that you approve any and all operations performed by us in accordance with the rules set forth in this Agreement, and any and all risks arising from such operations shall be assumed by you.

12. 【Termination of Agreement】
12.1 This Website shall have the right to cancel your account with this Website in accordance with this Agreement, and this Agreement shall be terminated on the date of the cancellation of your account.
12.2 This Website shall have the right to terminate all Service offered by this Website to you in accordance with this Agreement, and this Agreement shall terminate on the date of termination of all services offered by this Website to you.
12.3 After the termination of this Agreement, you do not have the right to require this Website to continue to provide you with any service or perform any other obligation, including, but not limited to, requesting this Website to keep or disclose to you any information in your former original account, or to forward to you or any third party any information therein that is not read or sent.
12.4 The termination of this Agreement shall not prevent the observant party from demanding the breaching party to assume other liabilities.

13.【Intellectual Property】
13.1 SUNDAX is the intellectual property owner of all intellectual achievements(including but not limited to business goodwill and trademarks, logos)on this Website.
All copyrights,trademarks,patents,trade secrets,and other intellectual property rights and other legitimate rights and interests of this website,as well as information related to the website(including text,pictures,audio,video,graphics,interface design,layout framework,revelant data or electrionic documents ,etc.)are protected by laws and regulations and corresponding international treaties.SUNDAX enjoys the above-mentioned intellectual property rights and legal rights ,except for the rights that the relevant right holders shall enjoy in accordance with the law.
You may not copy, modify, copy, transmit or use any of the foregoing materials or content for commercial purposes,including, but not limited to, website logos, databases, website design, text and graphics, software, photos, videos, music, sounds and any combinations of the aforementioned files, and the intellectual property rights of software compilation, associated source code and software (including small applications and scripts) shall be owned by this Website. 
13.2 Your log into this Website or use of any of the services offered by this Website shall not be deemed as our transfer of any intellectual property to you.For any information that you publish on this Website, you may not publish or authorize other websites (or media) to use such information in any manner wuatsoever.You shall not illegally use or dispose of the intellectual property rights of this Website or any other person during your use of the services offered by this Website. 
13.3 Upon accepting this Agreement, it shall be deemed that you, on the basis of your own free will, have transferred and assigned exclusively and free of charge to this Website all copyright of any form of information that you publish on this Website, including, but not limited to copyrights, distribution rights, lease rights, exhibition rights, performance rights, projection rights, broadcasting rights, information network dissemination rights, shooting rights, adaptation rights, translation rights, compilation rights and other transferable rights that copyright owners are entitled to, and this Website shall have the right to sue for any infringement on such copyright and obtain full compensation for such infringement. 
13.4 This Agreement shall apply to any content that is published by you on this Website and is protected by copyright law, regardless of whether the content is generated before or after the signing of this Agreement.

14.【Information protection】
14.1 【Scope of Application】
14.1.1 When you register your account with this Website or use your account with this Website, you shall provide personal registration information in accordance with the requirements of this Website, including but not limited to your telephone number, email address, and identity card information.
14.1.2 When you use the services offered by this Website, or visit this Website, this Website will automatically receive and record the server information of your web browser, including but not limited to the IP address and records on the web pages that you request to access.
14.1.3 The relevant data collected by this Website in connection with your transactions on this Website, including but not limited to transaction records.
14.1.4 Other personal information of yours legally obtained by this Website.
14.2 【Use of Information】
14.2.1 Upon your successful registration with this Website and without extra consent from you, it shall be deemed that you agree to permit this Website to collect and use all the information you publish on this Website; as is specified under 14.1 hereof, you acknowledge and agree that this Website can use your information collected by this Website for certain purposes, including but not limited to the following:
14.2.1.1 providing you with the services offered by this Website;
14.2.1.2 Reporting to relevant regulatory departments based on the requirements of the competent authorities in relevant sovereign states or regions;
14.2.1.3 When you use Services offered by this Website, this Website will use your information for such legal purposes as identity authentication, customer service, security, fraud monitoring, marketing & promotion, archiving, and backup, or joint promotion of this Website with a third party, so as to ensure the security of the products and services that this Website offers to you;
14.2.1.4 Inviting you to participate in surveys in connection with the services offered by this Website;Information collection and processing for the purpose of helping this Website design new products and services and improving the existing services offered by this Website;
14.2.1.5 In order to enable you to understand the specifics of the Services offered by this Website, you agree to permit this Website to send to you marketing event information, commercial electronic information, and advertising that is related to you in replacement of general-purpose ubiquitous advertising;
14.2.1.6 This Website may transfer or disclose your information to any third party that is not a related party of this Website, for the purpose of completing merger, division, acquisition or transfer of assets;
14.2.1.7 Software certification or management software upgrade;
14.2.1.8 Data analysis relating to cooperation with government agencies, public affairs agencies, associations, etc;
14.2.1.9 For all other legal purposes as well as other purposes authorized by you.
14.2.2 This Website will not sell or lend your personal information to any other person unless your permission is obtained in advance. This Website also does not allow any third party to collect, edit, sell or gratuitously spread your personal information in any manner whatsoever.
14.2.3 This Website shall keep confidential the customer identity information and transaction information that it obtains, and shall not provide any entity or individual with customer identification information or transaction information, except where any of the applicable laws, regulations, decrees, orders, etc., of relevant sovereign states or regions requires this Website to provide such information.
15.【Calculation 】
All the transaction calculations are verified by us, and all the calculation methods have been posted on the Website, but we can not ensure that your use of this Website will not be disturbed or free from errors.
16.【Export Control】
You understand and acknowledge that in accordance with relevant laws of Singapore, you shall not export, re-export, import or transfer any material (including software) on this Website; therefore, you hereby undertake that you will not voluntarily commit or assist or participate in any of the above export or related transfer or other violations of applicable laws and regulations; if you uncover any of the aforementioned events, you will report to us and assist us in handling them.
17.【Transfer】
The rights and obligations agreed in this Agreement shall be equally binding on the assignees, the heirs, executors and administrators of the parties hereto who benefit from the rights and obligations. Without our consent, you may not transfer to any third party any of your rights or obligations hereunder, provided, however, we may, at any time, assign our rights and obligations under this Agreement to any third party with thirty (30) days' notice to you.
18.【Severability】
If any provision of this Agreement is found unenforceable, invalid or illegal by any court of competent jurisdiction, validity of the remaining provisions of this Agreement shall not be affected.
19.【No Agency】
Nothing in this Agreement shall be deemed to have created, implied or otherwise treated us as your agent, trustee or other representative, unless it is provided otherwise in this Agreement.
20.【Waiver】
Our or your waiver of the right to hold the other party liable for breaches of agreement or any other liability as is agreed upon in this Agreement shall not be construed or deemed as a waiver of the right to hold the other party for other breaches of contract; a failure to exercise any right or remedy shall not be construed in any way as a waiver of such right or remedy.
21.【Headings】
All headings herein are exclusively for the convenience of wording and are not intended to to expand or limit the content or scope of the terms and conditions of this Agreement.
22.【Applicable Law】
This Agreement in its entirety is a contract concluded under the laws of Singapore, and relevant laws of Singapore shall apply to its establishment, interpretation, content and enforcement; Any claims or actions arising out of or relating to the Services agreed in this Agreement shall be governed and interpreted and enforced in accordance with the laws of Singapore. For the avoidance of doubt, this Clause shall be expressly applicable to any tort claim against us. The competent court or forum for any claim or action against us or in relation to us shall be in Singapore.You have unconditional access to exclusive jurisdiction in court proceedings and appeals in the courts of Singapore. You also unconditionally agree that the venue or competent court for any dispute or problem relating to this Agreement or any claim and proceeding arising from this Agreement shall be exclusively in Singapore. If any other business of this Website is subject to any special agreement on jurisdiction, such agreement shall prevail. The Doctrine of Forum Non Conveniens does not apply to the court of choice under these Terms of Service.
23.【Entry into Force and Interpretation of the Agreement】
23.1 This Agreement shall enter into force when you click through the registration page of this Website, complete the registration procedures, obtain your account number and password of this Website, and shall be binding on you and this Website. 
23.2 The ultimate power of interpretation of this Agreement shall be vested in this Website. 

Know-your-customers and Anti-Money Laundering Policies
1.【Preamble】
    1.1 We ensure that we comply with know-your-customer and anti-money-laundering laws and regulations, and will not knowingly violate know-your-customers and anti-money-laundering policies. To the extent of our reasonable control, we will adopt necessary measures and technology to provide you with Services that are safe and secure, so as to protect you against the loss caused by money laundering to the greatest extent possible.
1.2 Our know-your-customer and anti-money-laundering policies are a comprehensive system of international policies, including the know-your-customer and anti-money-laundering policies of the jurisdictions to which you are subject to. Our robust compliance framework ensures that we meet regulatory requirements and regulatory standards on both the local and global levels, and ensure the operational sustainability of our website.
2.【Content of Our Know-Your-Customer and Anti-Money-Laundering Policies】
2.1 We promulgate and update know-your-customers and anti-money-laundering policies to meet the standards set by relevant laws and regulations;
2.2 We promulgate and update some of the guidelines and rules in connection with the operation of this Website, and our staff will provide you whole-process service in accordance with the guidelines and rules;
2.3 We design and complete the procedures for internal monitoring and transaction control, such as rigorous identity authentication procedures, and form a professional team responsible for anti-money laundering;
2.4 We adopt risk-prevention-based approach to carry out due diligence and continuous supervision in connection with customers;
2.5 Review and regularly inspect existing transactions;
2.6 To report suspicious transactions to the competent authorities;
2.7 Proof documents of identity documents, address certificates and transaction records will be maintained for at least six(6) years; if they are submitted to the regulatory authorities, let it be understood that a separate notice will not be provided to you;
2.8 Credit cards are prohibited throughout the course of the transaction;
3.【Identity Information and the Verification and Confirmation Thereof】
3.1 【Identity Information】
3.1.1 In accordance with the laws and regulations of relevant jurisdictions and in light of the nature of entities concerned, the content of your information as is collected by us may vary, and in principle, we will collect the following information of yours if you register as an individual: 
3.1.1.1 Basic personal information: your name, address (and permanent address, if the two are different), date of birth and nationality, and other information available. Identity authentication shall be based on documents issued by the official or other similar authorities, such as passports, identity cards or other identity documents as are required and issued by relevant jurisdictions. The address you provide will be validated in an appropriate manner, such as checking the fare ticket of means of transportation you use, your interest rate bills, or voter register. 
3.1.1.2 Valid photo: before you register, you must provide a photograph showing you holding your identity document in front of your chest; 
3.1.1.3 Contact information: telephone/mobile phone number and valid email address.
3.1.2 If you are a company or any other type of legal entity, we will collect the following information of yours to determine the final beneficiary of your account or your trust account. 
3.1.2.1Your corporation enrollment and registration certificates of the company; 
3.1.2.2 a copy of the articles of association and memorandum of the company; 
3.1.2.3 the detailed certification materials of the ownership structure and ownership description of the company, and the decision of the board of directors on designating the authorized agent of the company responsible for the opening and execution of the account of the company with the website; 
3.1.2.4 the identity documents of the directors, major shareholders of the company as well as the authorized signatory for the company's account with the website, as are required to be provided in accordance with relevant rules; 
3.1.2.5 the company's main business address, and the company's mailing address if it is different from the main business address of the company. 
* If the local address of the company is different from its main business address, the company shall be deemed to be a high-risk customer, and consequently the company will be required to provide additional documentation. 
* Other certification documents, documents issued by competent authorities and other documents we may deem necessary in light of the laws and regulations of relevant jurisdictions and in light of the specific nature of your entity.
3.1.3 We only accept English and Chinese versions of your identity information; if your identity information is not in either of the two languages, you shall have your identity information translated into English and duly notarized.
3.2 【Confirmation and Verification】
3.2.1 You are required to provide both the front and back sides of your identity documents.
3.2.2 You are required to provide us with a photograph showing you holding your identity documents in front of your chest.
3.2.3 Copies of certification documents shall be checked against the originals thereof. Nonetheless, if a trusted and suitable certifier person can prove that such copies are accurate and comprehensive duplicates of the originals thereof, such copies shall be deemed as acceptable. Such certifiers include ambassadors, members of the judiciary, magistrates, etc.
3.2.4 The identification the ultimate beneficiary and controller of the account shall be based on the determination of which individuals ultimately own or control the direct customer and/or to determining that the ongoing transaction is performed by another person. If you are a business enterprise, the identity of major shareholders thereof (for example, those holding 10 % or more of the voting equity in such business enterprise) shall be verified. Generally, a shareholder holding 25 % of the shares of the company will be deemed as involving an average level of risk, and the identity of the shareholder shall be verified; a shareholder holding 10 % or more of the voting rights or shares is deemed to be involving a high level of risk, and the identity of the shareholder shall be verified.
4.【Transaction Supervision】
4.1 We constantly set and adjust daily trading and cash withdrawal limits based on security requirement and actual state of transactions;
4.2 If the transaction occurs frequently in an account registered by you or is beyond reasonable circumstances, our professional team will assess and determine whether such transaction is suspicious;
4.3 If we identify a specific transaction as suspicious on the basis of our assessment, we may adopt such restrictive measures as suspending the transaction or denying the transaction, and if it is possible, we may even reverse the transaction as soon as possible, and report to the competent authorities, without, however, notifying you;
4.4 We reserve the right to reject registration applications by applicants that do not comply with the international standards against money laundering or who may be regarded as political and public figures; we reserve the right to suspend or terminate a transaction identified as suspicious based on our own assessment, which, however, does not breach any of our obligations and duties to you.
    `
}
console.log("&&&&&&&&&&",language)
module.exports = {
    joinus,
    copyright:language == "en"?copyrightEn:copyright,
    privacy:language == "en"?privacyEn:privacy,
    userAgreement:language == "en"?userAgreementEn:userAgreement,
    application:language == "en"?applicationEn:application,
}