/**
 * Created by saa on 2018/6/13.
 */
// 顶部广告组件
function Ad(opt) {
    this.html='';
    this.ele=document.querySelector(opt.ele);

    this.init();
}
Ad.prototype={
    init(){
        this.Render();
        this.Close();
    },
    Render(){
        this.html=`<div id="clientDownload">
                        <i class="mclose"></i>
                        <div class="mtitle">
                            <a href="">
                                <i class="mlogo"></i>
                                <dl>
                                    <dt>
                                        您已收到150元新人红包
                                    </dt>
                                    <dd>
                                        下载时光网App查看（仅限新用户）
                                        <span>打开APP</span>
                                    </dd>
                                </dl>
                            </a>
                        </div>
                    </div>`;
        this.ele.innerHTML=this.html;
    },
    Close(){
        $('.mclose').on('tap',function(){
            $('#clientDownload').hide();
        })
    }
}

//头部导航组件
function HeaderNav(opt){
    this.html='';
    this.ele=document.querySelector(opt.ele);
    this.cur=opt.cur||0;


    this.init();
}

HeaderNav.prototype={
    init(){
        this.Render();
        this.Active();
    },
    Render(){
        this.html=`<div class="common_nav">
                    <ul>
                        <li>
                            <a href="index.html">
                                <i class="logo_mtime"></i>
                            </a>
                        </li>
                        <li>
                            <a href="index.html">
                                <span>首页</span>
                            </a>
                        </li>
                        <li>
                            <a href="theater.html">
                                <span>购票</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span>商城</span>
                                <em class="new">NEW</em>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span>发现</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="ico_my"></i>
                            </a>
                        </li>
                    </ul>
                </div>`;

        this.ele.innerHTML=this.html;
    },
    Active(){
        document.querySelectorAll('.common_nav ul li')[this.cur+1].className='curr';
    }
}

//底部组件
function Footer(opt){
    this.html='';
    this.ele=document.querySelector(opt.ele);

    this.init();
}

Footer.prototype={
    init(){
        this.Render();
    },
    Render(){
        this.html=`<div class="common_footer">
                        <nav class="link">
                            <ul>
                                <li>
                                    <a href="">
                                        <span>首页</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <span>购票</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <span>商城</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <span>发现</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <span>我的</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        <div class="footlink">
                            <ul>
                                <li>
                                    <a href="">
                                        <span>PC版</span>
                                    </a>
                                </li>
                                <li class="line">
                                    <span></span>
                                </li>
                                <li>
                                    <a href="">
                                        <span>客户端下载</span>
                                    </a>
                                </li>
                                <li class="line">
                                    <span></span>
                                </li>
                                <li>
                                    <a href="">
                                        <span>意见反馈</span>
                                    </a>
                                </li>
                                <li class="line">
                                    <span></span>
                                </li>
                                <li>
                                    <a href="">
                                        <span>帮助中心</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="copy">
                            <p>
                                <span>北京动艺时光网络科技有限公司</span>
                            </p>
                            <p>
                                <span>Copyright </span>
                                <span class="copytime">2006-2018</span>
                                <span> Mtime.com Inc. All rights reserved.</span>
                            </p>
                        </div>
                    </div>`;

        this.ele.innerHTML=this.html;
    }
}












