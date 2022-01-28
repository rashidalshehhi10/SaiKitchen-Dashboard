"use strict";

if ("serviceWorker" in navigator) {
   window.addEventListener("load", function () {
      navigator.serviceWorker
         .register("/serviceWorker.js")
         .then(res => console.log("service worker registered"))
         .catch(err => console.log("service worker not registered", err))
   })
}


import {
   baseURL
} from './constant.js'
export let user;
document.addEventListener("DOMContentLoaded", function(event) { 
   var scrollpos = localStorage.getItem('scrollpos');
   if (scrollpos) window.scrollTo(0, scrollpos);
});

window.onbeforeunload = function(e) {
   localStorage.setItem('scrollpos', window.scrollY);
};
// var script = document.createElement('script');
// script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
// script.type = 'text/javascript';
// document.getElementsByTagName('head')[0].appendChild(script);
document.getElementById("kt_header_mobile").innerHTML = ` <!--begin::Logo-->
                  <a href="home.html">
                  <img alt="Logo" src="assets/media/logos/logo-light.png" />
                  </a>
                  <!--end::Logo-->
                  <!--begin::Toolbar-->
                  <div class="d-flex align-items-center">
                    <!--begin::Aside Mobile Toggle-->
                    <button class="btn p-0 burger-icon burger-icon-left" id="kt_aside_mobile_toggle">
                    <span></span>
                    </button>
                    <!--end::Aside Mobile Toggle-->
                    <!--begin::Header Menu Mobile Toggle-->
                    <!-- <button class="btn p-0 burger-icon ml-4" id="kt_header_mobile_toggle">
                        <span></span>
                        </button> -->
                    <!--end::Header Menu Mobile Toggle-->
                    <!--begin::Topbar Mobile Toggle-->
                    <button class="btn btn-hover-text-primary p-0 ml-2" id="kt_header_mobile_topbar_toggle">
                        <span class="svg-icon svg-icon-xl svg-icon-light">
                          <!--begin::Svg Icon | path:assets/media/svg/icons/General/User.svg-->
                          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <polygon points="0 0 24 0 24 24 0 24" />
                                <path d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z" fill="#000000" fill-rule="nonzero" opacity="0.3" />
                                <path d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z" fill="#000000" fill-rule="nonzero" />
                              </g>
                          </svg>
                          <!--end::Svg Icon-->
                        </span>
                    </button>
                    <!--end::Topbar Mobile Toggle-->
                  </div>
                  <!--end::Toolbar-->`;
document.getElementById("kt_aside").innerHTML = `
                  <!--begin::Brand-->
                  <div class="brand flex-column-auto" id="kt_brand">
                     <!--begin::Logo-->
                     <a href="home.html" class="brand-logo">
                     <img alt="Logo" src="assets/media/logos/logo-light.png" />
                     </a>
                     <!--end::Logo-->
                     <!--begin::Toggle-->
                     <button class="brand-toggle btn btn-sm px-0" id="kt_aside_toggle">
                        <span class="svg-icon svg-icon svg-icon-xl svg-icon-light">
                           <!--begin::Svg Icon | path:assets/media/svg/icons/Navigation/Angle-double-left.svg-->
                           <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                 <polygon points="0 0 24 0 24 24 0 24" />
                                 <path d="M5.29288961,6.70710318 C4.90236532,6.31657888 4.90236532,5.68341391 5.29288961,5.29288961 C5.68341391,4.90236532 6.31657888,4.90236532 6.70710318,5.29288961 L12.7071032,11.2928896 C13.0856821,11.6714686 13.0989277,12.281055 12.7371505,12.675721 L7.23715054,18.675721 C6.86395813,19.08284 6.23139076,19.1103429 5.82427177,18.7371505 C5.41715278,18.3639581 5.38964985,17.7313908 5.76284226,17.3242718 L10.6158586,12.0300721 L5.29288961,6.70710318 Z" fill="#000000" fill-rule="nonzero" transform="translate(8.999997, 11.999999) scale(-1, 1) translate(-8.999997, -11.999999)" />
                                 <path d="M10.7071009,15.7071068 C10.3165766,16.0976311 9.68341162,16.0976311 9.29288733,15.7071068 C8.90236304,15.3165825 8.90236304,14.6834175 9.29288733,14.2928932 L15.2928873,8.29289322 C15.6714663,7.91431428 16.2810527,7.90106866 16.6757187,8.26284586 L22.6757187,13.7628459 C23.0828377,14.1360383 23.1103407,14.7686056 22.7371482,15.1757246 C22.3639558,15.5828436 21.7313885,15.6103465 21.3242695,15.2371541 L16.0300699,10.3841378 L10.7071009,15.7071068 Z" fill="#000000" fill-rule="nonzero" opacity="0.3" transform="translate(15.999997, 11.999999) scale(-1, 1) rotate(-270.000000) translate(-15.999997, -11.999999)" />
                              </g>
                           </svg>
                           <!--end::Svg Icon-->
                        </span>
                     </button>
                     <!--end::Toolbar-->
                  </div>
                  <!--end::Brand-->
                  <!--begin::Aside Menu-->
                  <div class="aside-menu-wrapper flex-column-fluid" id="kt_aside_menu_wrapper">
                     <!--begin::Menu Container-->
                     <div id="kt_aside_menu" class="aside-menu my-4" data-menu-vertical="1" data-menu-scroll="1" data-menu-dropdown-timeout="500">
                        <!--begin::Menu Nav-->
                        <ul class="menu-nav">
                           <li class="menu-item menu-item-active" aria-haspopup="true">
                              <a href="home.html" class="menu-link">
                                 <span class="svg-icon menu-icon">
                                    <!--begin::Svg Icon | path:assets/media/svg/icons/Design/Layers.svg-->
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                       <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                          <polygon points="0 0 24 0 24 24 0 24" />
                                          <path d="M12.9336061,16.072447 L19.36,10.9564761 L19.5181585,10.8312381 C20.1676248,10.3169571 20.2772143,9.3735535 19.7629333,8.72408713 C19.6917232,8.63415859 19.6104327,8.55269514 19.5206557,8.48129411 L12.9336854,3.24257445 C12.3871201,2.80788259 11.6128799,2.80788259 11.0663146,3.24257445 L4.47482784,8.48488609 C3.82645598,9.00054628 3.71887192,9.94418071 4.23453211,10.5925526 C4.30500305,10.6811601 4.38527899,10.7615046 4.47382636,10.8320511 L4.63,10.9564761 L11.0659024,16.0730648 C11.6126744,16.5077525 12.3871218,16.5074963 12.9336061,16.072447 Z" fill="#000000" fill-rule="nonzero" />
                                          <path d="M11.0563554,18.6706981 L5.33593024,14.122919 C4.94553994,13.8125559 4.37746707,13.8774308 4.06710397,14.2678211 C4.06471678,14.2708238 4.06234874,14.2738418 4.06,14.2768747 L4.06,14.2768747 C3.75257288,14.6738539 3.82516916,15.244888 4.22214834,15.5523151 C4.22358765,15.5534297 4.2250303,15.55454 4.22647627,15.555646 L11.0872776,20.8031356 C11.6250734,21.2144692 12.371757,21.2145375 12.909628,20.8033023 L19.7677785,15.559828 C20.1693192,15.2528257 20.2459576,14.6784381 19.9389553,14.2768974 C19.9376429,14.2751809 19.9363245,14.2734691 19.935,14.2717619 L19.935,14.2717619 C19.6266937,13.8743807 19.0546209,13.8021712 18.6572397,14.1104775 C18.654352,14.112718 18.6514778,14.1149757 18.6486172,14.1172508 L12.9235044,18.6705218 C12.377022,19.1051477 11.6029199,19.1052208 11.0563554,18.6706981 Z" fill="#000000" opacity="0.3" />
                                       </g>
                                    </svg>
                                    <!--end::Svg Icon-->
                                 </span>
                                 <span class="menu-text">Dashboard</span>
                              </a>
                           </li>
                        </ul>
                        <!--end::Menu Nav-->
                     </div>
                     <!--end::Menu Container-->
                  </div>
                  <!--end::Aside Menu-->
                  `;
document.getElementById("kt_header").innerHTML =
   `                  <!--begin::Container-->
                  <div class="container-fluid d-flex align-items-stretch justify-content-between">
                     <!--begin::Header Menu Wrapper-->
                     <div class="header-menu-wrapper header-menu-wrapper-left" id="kt_header_menu_wrapper">
                        <!--begin::Header Menu-->
                        <div id="kt_header_menu" class="header-menu header-menu-mobile header-menu-layout-default">
                           <!--begin::Header Nav-->
                           <ul class="menu-nav">
                           </ul>
                           <!--end::Header Nav-->
                        </div>
                        <!--end::Header Menu-->
                     </div>
                     <!--end::Header Menu Wrapper-->
                     <!--begin::Topbar-->
                     <div class="topbar">
                     <!--begin::Notifications-->
                     <div class="dropdown">
                        <!--begin::Toggle-->
                        <div class="topbar-item" data-toggle="dropdown" data-offset="10px,0px" aria-expanded="false">
                           <div class="btn btn-icon btn-clean btn-dropdown btn-lg mr-1 pulse pulse-primary">
                              <span class="svg-icon svg-icon-xl svg-icon-primary">
                                 <!--begin::Svg Icon | path:assets/media/svg/icons/Code/Compiling.svg-->
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAItElEQVRoge1ZaXBT1xX+zrP1JHmRbYw3PdvYjo0tnFAMNgMNhKWYrXQaQqeEpS2ELYGSmWYpSwqdTFog0IaUZmgotCkhBEpKSQsJxSzOBAohNSRQvGHsItBim8UbNlrf6Q9jI8mSLAmY/qi/mffj3rPc8717zz333Qf0oQ99+L8A/a8D6A3Nx7VDBeaxTqbSuGLTV770HjoRZhbMZttApxM6QWBJlikSAASB22WZjGFhqExJES8TkezPT8vRlE9YoDXEfBZAOEB2WabhcRONXz8yImVlrEhJsU1lxhwA4wHE92JyC8BxIt5tNisPFxaS3ZtS67Hklxn0K5dgX9ZMML/lTfeBiJSXs6jRWJcQ0asA0kJ0c42IN5nNym2ehJqOagsEwlmAFQDZZYGK4sYbL3hzEjIRk8k+WpblbQB0ofpwBTMqwsKEJVqt4pRrf1OJNEQgeZwcJpzwRQIIgQgzk9FoWw3gdQBhwYfsFw4AayVJ3EBEHIxhUESYOcxgsG4jogVBhRckiHiHVqt8noicXX0bNx6ZJsvYDfDslSsnf+JpIwTqnJnJZLK++6hJdI5FC41G23vM3P2iZZkZAGRB8DpTAc+IwWB9DcAvvA/M0F+pRF35OVytugBLexvAMgAGKAyqyGgMyB2Mxx4vxIBsHYgCG5YZq9LSlBsC0Q3I473ELoVHTlgtd/H5oT0o/9dn0GWl4Im8VOgGpiMyQu1m39FhQWWNHhcrDaisMyO/aCyemjYLSpW7nhc4iIQxkqQ4/cBEystZjImxfQ2P3eni2c9wfP8fML14GEYU5kEQAlulLDO+OFeJAyVlGDf9OXxj5Hj/+oyKhgZxiK9a04VeiVy/bllORFtc+w7v2QZrYyUWzi6GKCoCIuAJu92BHR8ehSIhD1NnLfGqk5ioQFubExYLL5Mkcas/f36JlJWxIjnZVguXYleybwfUFj1mfnd0t96hkjPouGvx6qOoIA+Z6SluOhFqFaZNHAkA2Pf3U2gX0zBp5qIetmq1AJuN4XSyvr5ezPE3K36JmEzWp2UZB7raVy9fwsm/vIMVy57xZxY01m/5CKNnLEfWoMF+tPg7qamqQ76kfhe2LGOWa7tk77tYPHdikGH2jqXzpmDXWz9F6YGdkGWnVx1mmu3PR7gvATMLRqN1fNektbXchirMgbiYKADAhfIrMJpv9rDrF6vBiMJBMJhu4GJFrc+B1Solxo0qAADEaKKQnZ4AdeM/8duVxzD3lU2IT0x20yfCRGYWfJ2afRIxm225APXvbl/7D7IGJHbLM9O1SEyI62GnUioBAAn9Y1EwOMcnETHcfejMjFRkx1kwMj8Bm998EXNe3YyEZMlVJd5ksuYAqA6KiNOJPNe61drcBE2EsrutiY6AJjrCZ6BKUYGUxN5O8/cRo4lEy50WPP5YAn4yPQdb3l6FZevegyC4la7coIkAnOq6F8TExaO2oqW7XV59FTar3629GznZaYiKUPWwiY6KQHZW51tvaLyF4RmRAICkfpEYlqHEhTOlKHhygqsrn58KPpOdiKJd2xkDdajVNwYUeCi4XKNHepKmu11cKOHciY/ddJhJ42nXBT8z4g6FqII2ezAuVtRh8KAs5OdmBB2sL5uK6qtIS4iAqLi/jKIjRFjbWwP27ZMIEbe6HD4BAMUz5mP7L1/E2vRkREd15ofVZsft5sAHBAABApISOzeKjg4L3t9zEKvnFrrpMDPI49hDxD4H8klElsnoeUiNionDjMWrsf6ddVi9/HuIilTjxs1mv9usN4QJYZgwdhg6OizY9JtdmDcpD1Fq96PO9cY76JfcIyWu+/Lps7KbTFadLKPCm0xfU4H929ZjwbNjoMtJD4LCfVyqrMMHf/4Ui6bpkJkS00O+5a9VeHLuWkgZ2feDJc6TJJXXXctnsvevXxgZ0f5pe7hd30M2IGcQnn99K/64tzSo4JkZ/66ow4bNO3Gq9HP87AfDvJI4fakBTk2mGwmAGrVa5WVfvr0uLVvZzKHEjjPRd/aFM8JwO/7ncIS7v3mlSo2oSO/fE0bzTXTctcDucKC1rQO3b7WgsqoWTc0tyEuLxYJJWYiP8W574rwJJ684sXDNGs+XcNzfd7xXIgRhXJeM4IRoq+xBxKSvgzbJvbLLsoy9H59EtaENKnU0rtVcQG6KGkW6RMyflInYKCX84fDZ66i5K2HR2lWehRBEvNufrVcizHyCiOwAFCCBbaKuRy6VlR5E8ci8bgJfnq/GgSNlKJrwDJbMnw4AcDod+OLoARwq/RtOV7ZgUHokkvupEB0hAgDSkzRuW64sM3SFY3uQAKCXJOURf0R8Jrvtq9lDIMvjWmNfSLQoR6z0lL+9Yh7GDs9BVV09Gm62IX/4GIya8n2oIiK9+mttbkJt+Xk0NRjQ3nITNksHTFcu4sdP5yAlvvMgeqn2Br5szcHUOUs9w1yamir+LiQiXWDmcKPRdh7AE67912qrcavBhMzcfMTGJ/qw9o8b9Qbs3/oGEtUWTClKRnqyBms/qMLyDbvuB0goN5vFggf+1AUAk8k+6t7lQ8AngWBw7UoVzpZ8hHp9NeISJMx95c0ukQMQnkpNVZzpzUcw10GrAKwLMdaQQIQVkqTcGIhuwBd0ndeYvCP0sIIDEW9Pqn+uwn5uVouj7Nlv96YfMBEi4s5rzEdPhoi3a7XKF8DOzrrB3m8X3WyCHYSZyWCwrSDCG3j4OeMgwmuBLidXhPxbwWi0fxOQf8+M/FB9eOASICwOJLG9IeCl5QlJUpw2m8UCIloGoOeBLHDoAVpaXy8ODZUEEOSMrFt3LJ7CnT9UhvPOl16afLurv/PXm3Vy55UNfwugBP+e+AYzHSPiDyVJ+Q8icoQW/n0EtcYFQf4RGL+2OggANnf13ytWBwEc7PwRZM0hIh1AkixzdKcttQGygRlVkqSsCfZHzkMlIoryn+x2yGI43velcy/Ay/eePvShD314uPgvMaY3gltBhfoAAAAASUVORK5CYII="/>
                                 <!--end::Svg Icon-->
                              </span>
                              <span class="pulse-ring"></span>
                           </div>
                        </div>
                        <!--end::Toggle-->
                        <!--begin::Dropdown-->
                        <div class="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-lg " style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(-292px, 65px, 0px);" x-placement="bottom-end">
                           <form>
                              <!--begin::Header-->

                              <!--end::Header-->
                              <!--begin::Content-->
                              <div class="tab-content">
                                 <!--begin::Tabpane-->
                                 <div class="tab-pane active show p-8" id="topbar_notifications_notifications" role="tabpanel">
                                     <iframe  width="300px" height="535px" allow="camera;microphone" src="https://lucid-greider.147-182-217-248.plesk.page/chat/" frameborder=0 allowfullscreen></iframe>
                                 </div>
                                 <!--end::Tabpane-->

                              </div>
                              <!--end::Content-->
                           </form>
                        </div>
                        <!--end::Dropdown-->
                     </div>
                     <!--end::Notifications-->
                        <!--begin::Notifications-->
                        <div class="dropdown">
                           <!--begin::Toggle-->
                           <div class="topbar-item" data-toggle="dropdown" data-offset="10px,0px">
                              <div class="btn btn-icon btn-clean btn-dropdown btn-lg mr-1 pulse pulse-primary">
                                 <span class="svg-icon svg-icon-xl svg-icon-primary">
                                    <!--begin::Svg Icon | path:assets/media/svg/icons/Code/Compiling.svg-->
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                       <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                          <rect x="0" y="0" width="24" height="24" />
                                          <path d="M2.56066017,10.6819805 L4.68198052,8.56066017 C5.26776695,7.97487373 6.21751442,7.97487373 6.80330086,8.56066017 L8.9246212,10.6819805 C9.51040764,11.267767 9.51040764,12.2175144 8.9246212,12.8033009 L6.80330086,14.9246212 C6.21751442,15.5104076 5.26776695,15.5104076 4.68198052,14.9246212 L2.56066017,12.8033009 C1.97487373,12.2175144 1.97487373,11.267767 2.56066017,10.6819805 Z M14.5606602,10.6819805 L16.6819805,8.56066017 C17.267767,7.97487373 18.2175144,7.97487373 18.8033009,8.56066017 L20.9246212,10.6819805 C21.5104076,11.267767 21.5104076,12.2175144 20.9246212,12.8033009 L18.8033009,14.9246212 C18.2175144,15.5104076 17.267767,15.5104076 16.6819805,14.9246212 L14.5606602,12.8033009 C13.9748737,12.2175144 13.9748737,11.267767 14.5606602,10.6819805 Z" fill="#000000" opacity="0.3" />
                                          <path d="M8.56066017,16.6819805 L10.6819805,14.5606602 C11.267767,13.9748737 12.2175144,13.9748737 12.8033009,14.5606602 L14.9246212,16.6819805 C15.5104076,17.267767 15.5104076,18.2175144 14.9246212,18.8033009 L12.8033009,20.9246212 C12.2175144,21.5104076 11.267767,21.5104076 10.6819805,20.9246212 L8.56066017,18.8033009 C7.97487373,18.2175144 7.97487373,17.267767 8.56066017,16.6819805 Z M8.56066017,4.68198052 L10.6819805,2.56066017 C11.267767,1.97487373 12.2175144,1.97487373 12.8033009,2.56066017 L14.9246212,4.68198052 C15.5104076,5.26776695 15.5104076,6.21751442 14.9246212,6.80330086 L12.8033009,8.9246212 C12.2175144,9.51040764 11.267767,9.51040764 10.6819805,8.9246212 L8.56066017,6.80330086 C7.97487373,6.21751442 7.97487373,5.26776695 8.56066017,4.68198052 Z" fill="#000000" />
                                       </g>
                                    </svg>
                                    <!--end::Svg Icon-->
                                 </span>
                                 <span class="pulse-ring"></span>
                              </div>
                           </div>
                           <!--end::Toggle-->
                           <!--begin::Dropdown-->
                           <div class="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-lg">
                              <form>
                                 <!--begin::Header-->
                                 <div class="d-flex flex-column pt-12 bgi-size-cover bgi-no-repeat rounded-top"
                                    style="background-image: url(assets/media/misc/bg-1.jpg)">
                                    <!--begin::Title-->
                                    <h4 class="d-flex flex-center rounded-top">
                                       <span class="text-white">Notifications</span>
                                       <!-- <span
                                          class="btn btn-text btn-success btn-sm font-weight-bold btn-font-md ml-2">23
                                          new</span> -->
                                    </h4>
                                    <!--end::Title-->
                                    <!--begin::Tabs-->
                                    <ul class="nav nav-bold nav-tabs nav-tabs-line nav-tabs-line-3x nav-tabs-line-transparent-white nav-tabs-line-active-border-success mt-3 px-8"
                                       role="tablist">
                                       <li class="nav-item">
                                          <a class="nav-link active show" data-toggle="tab"
                                             href="#topbar_notifications_notifications">All</a>
                                       </li>
                                       <li class="nav-item">
                                          <a class="nav-link" data-toggle="tab"
                                             href="#topbar_notifications_inquiry">Inquiry</a>
                                       </li>
                                       <li class="nav-item">
                                          <a class="nav-link" data-toggle="tab"
                                             href="#topbar_notifications_measurement">Measurements</a>
                                       </li>
                                       <li class="nav-item">
                                          <a class="nav-link" data-toggle="tab"
                                             href="#topbar_notifications_design">Design</a>
                                       </li>
                                    </ul>
                                    <!--end::Tabs-->
                                 </div>
                                 <!--end::Header-->
                                 <!--begin::Content-->
                                 <div class="tab-content">
                                    <!--begin::Tabpane-->
                                    <div class="tab-pane active show p-8"
                                       id="topbar_notifications_notifications" role="tabpanel">
                                       <!--begin::Scroll-->
                                       <div class="scroll pr-7 mr-n7" data-scroll="true" data-height="300"
                                          data-mobile-height="200" id="notification">
                                          <!--begin::Item-->
                                          <div class="d-flex align-items-center mb-6">
                                             <!--begin::Symbol-->
                                             <div class="symbol symbol-40 symbol-light-primary mr-5">
                                                <span class="symbol-label">
                                                   <span class="svg-icon svg-icon-lg svg-icon-primary">
                                                      <!--begin::Svg Icon | path:assets/media/svg/icons/Home/Library.svg-->
                                                      <svg xmlns="http://www.w3.org/2000/svg"
                                                         xmlns:xlink="http://www.w3.org/1999/xlink"
                                                         width="24px" height="24px" viewBox="0 0 24 24"
                                                         version="1.1">
                                                         <g stroke="none" stroke-width="1" fill="none"
                                                            fill-rule="evenodd">
                                                            <rect x="0" y="0" width="24" height="24" />
                                                            <path
                                                               d="M5,3 L6,3 C6.55228475,3 7,3.44771525 7,4 L7,20 C7,20.5522847 6.55228475,21 6,21 L5,21 C4.44771525,21 4,20.5522847 4,20 L4,4 C4,3.44771525 4.44771525,3 5,3 Z M10,3 L11,3 C11.5522847,3 12,3.44771525 12,4 L12,20 C12,20.5522847 11.5522847,21 11,21 L10,21 C9.44771525,21 9,20.5522847 9,20 L9,4 C9,3.44771525 9.44771525,3 10,3 Z"
                                                               fill="#000000" />
                                                            <rect fill="#000000" opacity="0.3"
                                                               transform="translate(17.825568, 11.945519) rotate(-19.000000) translate(-17.825568, -11.945519)"
                                                               x="16.3255682" y="2.94551858" width="3"
                                                               height="18" rx="1" />
                                                         </g>
                                                      </svg>
                                                      <!--end::Svg Icon-->
                                                   </span>
                                                </span>
                                             </div>
                                             <!--end::Symbol-->
                                             <!--begin::Text-->
                                             <div class="d-flex flex-column font-weight-bold">
                                                <a href="#"
                                                   class="text-dark text-hover-primary mb-1 font-size-lg">Job
                                                Order Confirmation</a>
                                                <span class="text-muted">Job Order</span>
                                             </div>
                                             <!--end::Text-->
                                          </div>
                                          <!--end::Item-->
                                       </div>
                                       <!--end::Scroll-->
                                       <!--begin::Action-->
                                       <!-- <div class="d-flex flex-center pt-7">
                                          <a href="#" class="btn btn-light-primary font-weight-bold text-center">See All</a>
                                          </div> -->
                                       <!--end::Action-->
                                    </div>
                                    <!--end::Tabpane-->
                                    <!--begin::Tabpane-->
                                    <div class="tab-pane  show p-8"
                                       id="topbar_notifications_inquiry" role="tabpanel">
                                       <!--begin::Scroll-->
                                       <div class="scroll pr-7 mr-n7" data-scroll="true" data-height="300"
                                          data-mobile-height="200" id="notificationinquiry">
                                          <!--begin::Nav-->
                                          <div class="d-flex flex-center text-center text-muted min-h-200px">All
                                             caught up!
                                             <br />No new notifications.
                                          </div>
                                          <!--end::Nav-->
                                       </div>
                                       <!--end::Scroll-->
                                    </div>
                                    <!--end::Tabpane-->
                                    <!--begin::Tabpane-->
                                    <div class="tab-pane" id="topbar_notifications_test" role="tabpanel">
                                       <!--begin::Nav-->
                                       <div class="navi navi-hover scroll my-4" data-scroll="true"
                                          data-height="300" data-mobile-height="200" id="notificationtest">
                                          <!--begin::Item-->
                                          <a href="#" class="navi-item">
                                             <div class="navi-link">
                                                <div class="navi-icon mr-2">
                                                   <i class="flaticon2-line-chart text-success"></i>
                                                </div>
                                                <div class="navi-text">
                                                   <div class="font-weight-bold">New report has been
                                                      received
                                                   </div>
                                                   <div class="text-muted">23 hrs ago</div>
                                                </div>
                                             </div>
                                          </a>
                                          <!--end::Item-->
                                          <!--begin::Item-->
                                          <a href="#" class="navi-item">
                                             <div class="navi-link">
                                                <div class="navi-icon mr-2">
                                                   <i class="flaticon2-paper-plane text-danger"></i>
                                                </div>
                                                <div class="navi-text">
                                                   <div class="font-weight-bold">Finance report has been
                                                      generated
                                                   </div>
                                                   <div class="text-muted">25 hrs ago</div>
                                                </div>
                                             </div>
                                          </a>
                                          <!--end::Item-->
                                          <!--begin::Item-->
                                          <a href="#" class="navi-item">
                                             <div class="navi-link">
                                                <div class="navi-icon mr-2">
                                                   <i
                                                      class="flaticon2-user flaticon2-line- text-success"></i>
                                                </div>
                                                <div class="navi-text">
                                                   <div class="font-weight-bold">New order has been
                                                      received
                                                   </div>
                                                   <div class="text-muted">2 hrs ago</div>
                                                </div>
                                             </div>
                                          </a>
                                          <!--end::Item-->
                                          <!--begin::Item-->
                                          <a href="#" class="navi-item">
                                             <div class="navi-link">
                                                <div class="navi-icon mr-2">
                                                   <i class="flaticon2-pin text-primary"></i>
                                                </div>
                                                <div class="navi-text">
                                                   <div class="font-weight-bold">New customer is registered
                                                   </div>
                                                   <div class="text-muted">3 hrs ago</div>
                                                </div>
                                             </div>
                                          </a>
                                          <!--end::Item-->
                                          <!--begin::Item-->
                                          <a href="#" class="navi-item">
                                             <div class="navi-link">
                                                <div class="navi-icon mr-2">
                                                   <i class="flaticon2-sms text-danger"></i>
                                                </div>
                                                <div class="navi-text">
                                                   <div class="font-weight-bold">Application has been
                                                      approved
                                                   </div>
                                                   <div class="text-muted">3 hrs ago</div>
                                                </div>
                                             </div>
                                          </a>
                                          <!--end::Item-->
                                          <!--begin::Item-->
                                          <a href="#" class="navi-item">
                                             <div class="navi-link">
                                                <div class="navi-icon mr-2">
                                                   <i class="flaticon2-pie-chart-3 text-warning"></i>
                                                </div>
                                                <div class="navinavinavi-text">
                                                   <div class="font-weight-bold">New file has been uploaded
                                                   </div>
                                                   <div class="text-muted">5 hrs ago</div>
                                                </div>
                                             </div>
                                          </a>
                                          <!--end::Item-->
                                          <!--begin::Item-->
                                          <a href="#" class="navi-item">
                                             <div class="navi-link">
                                                <div class="navi-icon mr-2">
                                                   <i class="flaticon-pie-chart-1 text-info"></i>
                                                </div>
                                                <div class="navi-text">
                                                   <div class="font-weight-bold">New user feedback received
                                                   </div>
                                                   <div class="text-muted">8 hrs ago</div>
                                                </div>
                                             </div>
                                          </a>
                                          <!--end::Item-->
                                          <!--begin::Item-->
                                          <a href="#" class="navi-item">
                                             <div class="navi-link">
                                                <div class="navi-icon mr-2">
                                                   <i class="flaticon2-settings text-success"></i>
                                                </div>
                                                <div class="navi-text">
                                                   <div class="font-weight-bold">System reboot has been
                                                      successfully completed
                                                   </div>
                                                   <div class="text-muted">12 hrs ago</div>
                                                </div>
                                             </div>
                                          </a>
                                          <!--end::Item-->
                                          <!--begin::Item-->
                                          <a href="#" class="navi-item">
                                             <div class="navi-link">
                                                <div class="navi-icon mr-2">
                                                   <i
                                                      class="flaticon-safe-shield-protection text-primary"></i>
                                                </div>
                                                <div class="navi-text">
                                                   <div class="font-weight-bold">New order has been placed
                                                   </div>
                                                   <div class="text-muted">15 hrs ago</div>
                                                </div>
                                             </div>
                                          </a>
                                          <!--end::Item-->
                                          <!--begin::Item-->
                                          <a href="#" class="navi-item">
                                             <div class="navi-link">
                                                <div class="navi-icon mr-2">
                                                   <i class="flaticon2-notification text-primary"></i>
                                                </div>
                                                <div class="navi-text">
                                                   <div class="font-weight-bold">Company meeting canceled
                                                   </div>
                                                   <div class="text-muted">19 hrs ago</div>
                                                </div>
                                             </div>
                                          </a>
                                          <!--end::Item-->
                                          <!--begin::Item-->
                                          <a href="#" class="navi-item">
                                             <div class="navi-link">
                                                <div class="navi-icon mr-2">
                                                   <i class="flaticon2-fax text-success"></i>
                                                </div>
                                                <div class="navi-text">
                                                   <div class="font-weight-bold">New report has been
                                                      received
                                                   </div>
                                                   <div class="text-muted">23 hrs ago</div>
                                                </div>
                                             </div>
                                          </a>
                                          <!--end::Item-->
                                          <!--begin::Item-->
                                          <a href="#" class="navi-item">
                                             <div class="navi-link">
                                                <div class="navi-icon mr-2">
                                                   <i class="flaticon-download-1 text-danger"></i>
                                                </div>
                                                <div class="navi-text">
                                                   <div class="font-weight-bold">Finance report has been
                                                      generated
                                                   </div>
                                                   <div class="text-muted">25 hrs ago</div>
                                                </div>
                                             </div>
                                          </a>
                                          <!--end::Item-->
                                          <!--begin::Item-->
                                          <a href="#" class="navi-item">
                                             <div class="navi-link">
                                                <div class="navi-icon mr-2">
                                                   <i class="flaticon-security text-warning"></i>
                                                </div>
                                                <div class="navi-text">
                                                   <div class="font-weight-bold">New customer comment
                                                      recieved
                                                   </div>
                                                   <div class="text-muted">2 days ago</div>
                                                </div>
                                             </div>
                                          </a>
                                          <!--end::Item-->
                                          <!--begin::Item-->
                                          <a href="#" class="navi-item">
                                             <div class="navi-link">
                                                <div class="navi-icon mr-2">
                                                   <i class="flaticon2-analytics-1 text-success"></i>
                                                </div>
                                                <div class="navi-text">
                                                   <div class="font-weight-bold">New customer is registered
                                                   </div>
                                                   <div class="text-muted">3 days ago</div>
                                                </div>
                                             </div>
                                          </a>
                                          <!--end::Item-->
                                       </div>
                                       <!--end::Nav-->
                                    </div>
                                    <!--end::Tabpane-->
                                    <!--begin::Tabpane-->
                                    <div class="tab-pane  show p-8"
                                       id="topbar_notifications_measurement" role="tabpanel">
                                       <!--begin::Scroll-->
                                       <div class="scroll pr-7 mr-n7" data-scroll="true" data-height="300"
                                          data-mobile-height="200" id="notificationmeasurement">
                                          <!--begin::Item-->
                                          <div class="d-flex align-items-center mb-6">
                                             <!--begin::Symbol-->
                                             <div class="symbol symbol-40 symbol-light-primary mr-5">
                                                <span class="symbol-label">
                                                   <span class="svg-icon svg-icon-lg svg-icon-primary">
                                                      <!--begin::Svg Icon | path:assets/media/svg/icons/Home/Library.svg-->
                                                      <svg xmlns="http://www.w3.org/2000/svg"
                                                         xmlns:xlink="http://www.w3.org/1999/xlink"
                                                         width="24px" height="24px" viewBox="0 0 24 24"
                                                         version="1.1">
                                                         <g stroke="none" stroke-width="1" fill="none"
                                                            fill-rule="evenodd">
                                                            <rect x="0" y="0" width="24" height="24" />
                                                            <path
                                                               d="M5,3 L6,3 C6.55228475,3 7,3.44771525 7,4 L7,20 C7,20.5522847 6.55228475,21 6,21 L5,21 C4.44771525,21 4,20.5522847 4,20 L4,4 C4,3.44771525 4.44771525,3 5,3 Z M10,3 L11,3 C11.5522847,3 12,3.44771525 12,4 L12,20 C12,20.5522847 11.5522847,21 11,21 L10,21 C9.44771525,21 9,20.5522847 9,20 L9,4 C9,3.44771525 9.44771525,3 10,3 Z"
                                                               fill="#000000" />
                                                            <rect fill="#000000" opacity="0.3"
                                                               transform="translate(17.825568, 11.945519) rotate(-19.000000) translate(-17.825568, -11.945519)"
                                                               x="16.3255682" y="2.94551858" width="3"
                                                               height="18" rx="1" />
                                                         </g>
                                                      </svg>
                                                      <!--end::Svg Icon-->
                                                   </span>
                                                </span>
                                             </div>
                                             <!--end::Symbol-->
                                             <!--begin::Text-->
                                             <div class="d-flex flex-column font-weight-bold">
                                                <a href="#"
                                                   class="text-dark text-hover-primary mb-1 font-size-lg">Job
                                                Order Confirmation</a>
                                                <span class="text-muted">Job Order</span>
                                             </div>
                                             <!--end::Text-->
                                          </div>
                                          <!--end::Item-->
                                       </div>
                                       <!--end::Scroll-->
                                       <!--begin::Action-->
                                       <!-- <div class="d-flex flex-center pt-7">
                                          <a href="#" class="btn btn-light-primary font-weight-bold text-center">See All</a>
                                          </div> -->
                                       <!--end::Action-->
                                    </div>
                                    <!--end::Tabpane-->
                                    <!--begin::Tabpane-->
                                    <div class="tab-pane  show p-8"
                                       id="topbar_notifications_design" role="tabpanel">
                                       <!--begin::Scroll-->
                                       <div class="scroll pr-7 mr-n7" data-scroll="true" data-height="300"
                                          data-mobile-height="200" id="notificatiodesign">
                                          <!--begin::Nav-->
                                          <div class="d-flex flex-center text-center text-muted min-h-200px">All
                                             caught up!
                                             <br />No new notifications.
                                          </div>
                                          <!--end::Nav-->
                                       </div>
                                       <!--end::Scroll-->
                                    </div>
                                    <!--end::Tabpane-->
                                    <!--begin::Tabpane-->
                                    <div class="tab-pane" id="topbar_notifications_logs" role="tabpanel">
                                       <!--begin::Nav-->
                                       <div class="d-flex flex-center text-center text-muted min-h-200px">All
                                          caught up!
                                          <br />No new notifications.
                                       </div>
                                       <!--end::Nav-->
                                    </div>
                                    <!--end::Tabpane-->
                                 </div>
                                 <!--end::Content-->
                              </form>
                           </div>
                           <!--end::Dropdown-->
                        </div>
                        <!--end::Notifications-->
                        <!--begin::Quick Actions-->
                        <div class="dropdown">
                           <!--begin::Toggle-->
                           <div class="topbar-item" data-toggle="dropdown" data-offset="10px,0px">
                              <div class="btn btn-icon btn-clean btn-dropdown btn-lg mr-1">
                                 <span class="svg-icon svg-icon-xl svg-icon-primary">
                                    <!--begin::Svg Icon | path:assets/media/svg/icons/Media/Equalizer.svg-->
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                       <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                          <rect x="0" y="0" width="24" height="24" />
                                          <rect fill="#000000" opacity="0.3" x="13" y="4" width="3" height="16" rx="1.5" />
                                          <rect fill="#000000" x="8" y="9" width="3" height="11" rx="1.5" />
                                          <rect fill="#000000" x="18" y="11" width="3" height="9" rx="1.5" />
                                          <rect fill="#000000" x="3" y="13" width="3" height="7" rx="1.5" />
                                       </g>
                                    </svg>
                                    <!--end::Svg Icon-->
                                 </span>
                              </div>
                           </div>
                           <!--end::Toggle-->
                           <!--begin::Dropdown-->
                           <div class="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-lg">
                              <!--begin:Header-->
                              <div class="d-flex flex-column flex-center py-10 bgi-size-cover bgi-no-repeat rounded-top" style="background-image: url(assets/media/misc/bg-1.jpg)">
                                 <h4 class="text-white font-weight-bold">Quick Actions</h4>
                                 <span class="btn btn-success btn-sm font-weight-bold font-size-sm mt-2">23 tasks pending</span>
                              </div>
                              <!--end:Header-->
                              <!--begin:Nav-->
                              <div class="row row-paddingless">
                                 <!--begin:Item-->
                                 <div class="col-6">
                                    <a href="#" class="d-block py-10 px-5 text-center bg-hover-light border-right border-bottom">
                                       <span class="svg-icon svg-icon-3x svg-icon-success">
                                          <!--begin::Svg Icon | path:assets/media/svg/icons/Shopping/Euro.svg-->
                                          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                             <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                <rect x="0" y="0" width="24" height="24" />
                                                <path d="M4.3618034,10.2763932 L4.8618034,9.2763932 C4.94649941,9.10700119 5.11963097,9 5.30901699,9 L15.190983,9 C15.4671254,9 15.690983,9.22385763 15.690983,9.5 C15.690983,9.57762255 15.6729105,9.65417908 15.6381966,9.7236068 L15.1381966,10.7236068 C15.0535006,10.8929988 14.880369,11 14.690983,11 L4.80901699,11 C4.53287462,11 4.30901699,10.7761424 4.30901699,10.5 C4.30901699,10.4223775 4.32708954,10.3458209 4.3618034,10.2763932 Z M14.6381966,13.7236068 L14.1381966,14.7236068 C14.0535006,14.8929988 13.880369,15 13.690983,15 L4.80901699,15 C4.53287462,15 4.30901699,14.7761424 4.30901699,14.5 C4.30901699,14.4223775 4.32708954,14.3458209 4.3618034,14.2763932 L4.8618034,13.2763932 C4.94649941,13.1070012 5.11963097,13 5.30901699,13 L14.190983,13 C14.4671254,13 14.690983,13.2238576 14.690983,13.5 C14.690983,13.5776225 14.6729105,13.6541791 14.6381966,13.7236068 Z" fill="#000000" opacity="0.3" />
                                                <path d="M17.369,7.618 C16.976998,7.08599734 16.4660031,6.69750122 15.836,6.4525 C15.2059968,6.20749878 14.590003,6.085 13.988,6.085 C13.2179962,6.085 12.5180032,6.2249986 11.888,6.505 C11.2579969,6.7850014 10.7155023,7.16999755 10.2605,7.66 C9.80549773,8.15000245 9.45550123,8.72399671 9.2105,9.382 C8.96549878,10.0400033 8.843,10.7539961 8.843,11.524 C8.843,12.3360041 8.96199881,13.0779966 9.2,13.75 C9.43800119,14.4220034 9.7774978,14.9994976 10.2185,15.4825 C10.6595022,15.9655024 11.1879969,16.3399987 11.804,16.606 C12.4200031,16.8720013 13.1129962,17.005 13.883,17.005 C14.681004,17.005 15.3879969,16.8475016 16.004,16.5325 C16.6200031,16.2174984 17.1169981,15.8010026 17.495,15.283 L19.616,16.774 C18.9579967,17.6000041 18.1530048,18.2404977 17.201,18.6955 C16.2489952,19.1505023 15.1360064,19.378 13.862,19.378 C12.6999942,19.378 11.6325049,19.1855019 10.6595,18.8005 C9.68649514,18.4154981 8.8500035,17.8765035 8.15,17.1835 C7.4499965,16.4904965 6.90400196,15.6645048 6.512,14.7055 C6.11999804,13.7464952 5.924,12.6860058 5.924,11.524 C5.924,10.333994 6.13049794,9.25950479 6.5435,8.3005 C6.95650207,7.34149521 7.5234964,6.52600336 8.2445,5.854 C8.96550361,5.18199664 9.8159951,4.66400182 10.796,4.3 C11.7760049,3.93599818 12.8399943,3.754 13.988,3.754 C14.4640024,3.754 14.9609974,3.79949954 15.479,3.8905 C15.9970026,3.98150045 16.4939976,4.12149906 16.97,4.3105 C17.4460024,4.49950095 17.8939979,4.7339986 18.314,5.014 C18.7340021,5.2940014 19.0909985,5.62999804 19.385,6.022 L17.369,7.618 Z" fill="#000000" />
                                             </g>
                                          </svg>
                                          <!--end::Svg Icon-->
                                       </span>
                                       <span class="d-block text-dark-75 font-weight-bold font-size-h6 mt-2 mb-1">Customer</span>
                                       <span class="d-block text-dark-50 font-size-lg">AddCustomer</span>
                                    </a>
                                 </div>
                                 <!--end:Item-->
                                 <!--begin:Item-->
                                 <div class="col-6">
                                    <a href="#" class="d-block py-10 px-5 text-center bg-hover-light border-bottom">
                                       <span class="svg-icon svg-icon-3x svg-icon-success">
                                          <!--begin::Svg Icon | path:assets/media/svg/icons/Communication/Mail-attachment.svg-->
                                          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                             <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                <rect x="0" y="0" width="24" height="24" />
                                                <path d="M14.8571499,13 C14.9499122,12.7223297 15,12.4263059 15,12.1190476 L15,6.88095238 C15,5.28984632 13.6568542,4 12,4 L11.7272727,4 C10.2210416,4 9,5.17258756 9,6.61904762 L10.0909091,6.61904762 C10.0909091,5.75117158 10.823534,5.04761905 11.7272727,5.04761905 L12,5.04761905 C13.0543618,5.04761905 13.9090909,5.86843034 13.9090909,6.88095238 L13.9090909,12.1190476 C13.9090909,12.4383379 13.8240964,12.7385644 13.6746497,13 L10.3253503,13 C10.1759036,12.7385644 10.0909091,12.4383379 10.0909091,12.1190476 L10.0909091,9.5 C10.0909091,9.06606198 10.4572216,8.71428571 10.9090909,8.71428571 C11.3609602,8.71428571 11.7272727,9.06606198 11.7272727,9.5 L11.7272727,11.3333333 L12.8181818,11.3333333 L12.8181818,9.5 C12.8181818,8.48747796 11.9634527,7.66666667 10.9090909,7.66666667 C9.85472911,7.66666667 9,8.48747796 9,9.5 L9,12.1190476 C9,12.4263059 9.0500878,12.7223297 9.14285008,13 L6,13 C5.44771525,13 5,12.5522847 5,12 L5,3 C5,2.44771525 5.44771525,2 6,2 L18,2 C18.5522847,2 19,2.44771525 19,3 L19,12 C19,12.5522847 18.5522847,13 18,13 L14.8571499,13 Z" fill="#000000" opacity="0.3" />
                                                <path d="M9,10.3333333 L9,12.1190476 C9,13.7101537 10.3431458,15 12,15 C13.6568542,15 15,13.7101537 15,12.1190476 L15,10.3333333 L20.2072547,6.57253826 C20.4311176,6.4108595 20.7436609,6.46126971 20.9053396,6.68513259 C20.9668779,6.77033951 21,6.87277228 21,6.97787787 L21,17 C21,18.1045695 20.1045695,19 19,19 L5,19 C3.8954305,19 3,18.1045695 3,17 L3,6.97787787 C3,6.70173549 3.22385763,6.47787787 3.5,6.47787787 C3.60510559,6.47787787 3.70753836,6.51099993 3.79274528,6.57253826 L9,10.3333333 Z M10.0909091,11.1212121 L12,12.5 L13.9090909,11.1212121 L13.9090909,12.1190476 C13.9090909,13.1315697 13.0543618,13.952381 12,13.952381 C10.9456382,13.952381 10.0909091,13.1315697 10.0909091,12.1190476 L10.0909091,11.1212121 Z" fill="#000000" />
                                             </g>
                                          </svg>
                                          <!--end::Svg Icon-->
                                       </span>
                                       <span class="d-block text-dark-75 font-weight-bold font-size-h6 mt-2 mb-1">Inquiries</span>
                                       <span class="d-block text-dark-50 font-size-lg">View Inquiries</span>
                                    </a>
                                 </div>
                                 <!--end:Item-->
                                 <!--begin:Item-->
                                 <div class="col-6">
                                    <a href="#" class="d-block py-10 px-5 text-center bg-hover-light border-right">
                                       <span class="svg-icon svg-icon-3x svg-icon-success">
                                          <!--begin::Svg Icon | path:assets/media/svg/icons/Shopping/Box2.svg-->
                                          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                             <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                <rect x="0" y="0" width="24" height="24" />
                                                <path d="M4,9.67471899 L10.880262,13.6470401 C10.9543486,13.689814 11.0320333,13.7207107 11.1111111,13.740321 L11.1111111,21.4444444 L4.49070127,17.526473 C4.18655139,17.3464765 4,17.0193034 4,16.6658832 L4,9.67471899 Z M20,9.56911707 L20,16.6658832 C20,17.0193034 19.8134486,17.3464765 19.5092987,17.526473 L12.8888889,21.4444444 L12.8888889,13.6728275 C12.9050191,13.6647696 12.9210067,13.6561758 12.9368301,13.6470401 L20,9.56911707 Z" fill="#000000" />
                                                <path d="M4.21611835,7.74669402 C4.30015839,7.64056877 4.40623188,7.55087574 4.5299008,7.48500698 L11.5299008,3.75665466 C11.8237589,3.60013944 12.1762411,3.60013944 12.4700992,3.75665466 L19.4700992,7.48500698 C19.5654307,7.53578262 19.6503066,7.60071528 19.7226939,7.67641889 L12.0479413,12.1074394 C11.9974761,12.1365754 11.9509488,12.1699127 11.9085461,12.2067543 C11.8661433,12.1699127 11.819616,12.1365754 11.7691509,12.1074394 L4.21611835,7.74669402 Z" fill="#000000" opacity="0.3" />
                                             </g>
                                          </svg>
                                          <!--end::Svg Icon-->
                                       </span>
                                       <span class="d-block text-dark-75 font-weight-bold font-size-h6 mt-2 mb-1">Job Orders</span>
                                       <span class="d-block text-dark-50 font-size-lg">View Job Orders</span>
                                    </a>
                                 </div>
                                 <!--end:Item-->
                                 <!--begin:Item-->
                                 <div class="col-6">
                                    <a href="#" class="d-block py-10 px-5 text-center bg-hover-light">
                                       <span class="svg-icon svg-icon-3x svg-icon-success">
                                          <!--begin::Svg Icon | path:assets/media/svg/icons/Communication/Group.svg-->
                                          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                             <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                <polygon points="0 0 24 0 24 24 0 24" />
                                                <path d="M18,14 C16.3431458,14 15,12.6568542 15,11 C15,9.34314575 16.3431458,8 18,8 C19.6568542,8 21,9.34314575 21,11 C21,12.6568542 19.6568542,14 18,14 Z M9,11 C6.790861,11 5,9.209139 5,7 C5,4.790861 6.790861,3 9,3 C11.209139,3 13,4.790861 13,7 C13,9.209139 11.209139,11 9,11 Z" fill="#000000" fill-rule="nonzero" opacity="0.3" />
                                                <path d="M17.6011961,15.0006174 C21.0077043,15.0378534 23.7891749,16.7601418 23.9984937,20.4 C24.0069246,20.5466056 23.9984937,21 23.4559499,21 L19.6,21 C19.6,18.7490654 18.8562935,16.6718327 17.6011961,15.0006174 Z M0.00065168429,20.1992055 C0.388258525,15.4265159 4.26191235,13 8.98334134,13 C13.7712164,13 17.7048837,15.2931929 17.9979143,20.2 C18.0095879,20.3954741 17.9979143,21 17.2466999,21 C13.541124,21 8.03472472,21 0.727502227,21 C0.476712155,21 -0.0204617505,20.45918 0.00065168429,20.1992055 Z" fill="#000000" fill-rule="nonzero" />
                                             </g>
                                          </svg>
                                          <!--end::Svg Icon-->
                                       </span>
                                       <span class="d-block text-dark-75 font-weight-bold font-size-h6 mt-2 mb-1">Procurement</span>
                                       <span class="d-block text-dark-50 font-size-lg">Purchase order Follow-ups</span>
                                    </a>
                                 </div>
                                 <!--end:Item-->
                              </div>
                              <!--end:Nav-->
                           </div>
                           <!--end::Dropdown-->
                        </div>
                        <!--end::Quick Actions-->
                        <!--begin::User-->
                        <div class="topbar-item">
                           <div class="btn btn-icon btn-icon-mobile w-auto btn-clean d-flex align-items-center btn-lg px-2" id="kt_quick_user_toggle">
                              <span class="text-muted font-weight-bold font-size-base d-none d-md-inline mr-1">Hi,</span>
                              <span class="text-dark-50 font-weight-bolder font-size-base d-none d-md-inline mr-3" id="dashboardUserName">CRM</span>
                              <span class="symbol symbol-lg-35 symbol-25 symbol-light-success">
                              <span class="symbol-label font-size-h5 font-weight-bold">C</span>
                              </span>
                           </div>
                        </div>
                        <!--end::User-->
                     </div>
                     <!--end::Topbar-->
                  </div>
                  <!--end::Container-->
               `;
try {

   document.getElementById("kt_footer").innerHTML = `<div class="container-fluid d-flex flex-column flex-md-row align-items-center justify-content-between">
<!--begin::Copyright-->
<div class="text-dark order-2 order-md-1">
  <span class="text-muted font-weight-bold mr-2">2021©</span>
  <a href="http://www.sai-group.ae/" target="_blank" class="text-dark-75 text-hover-primary">Sai Kitchen</a>
</div>
<!--end::Copyright-->
<!--begin::Nav-->
<div class="nav nav-dark">
  <a href="http://www.sai-group.ae/about/" target="_blank" class="nav-link pl-0 pr-5">About</a>
  <a href="http://www.sai-group.ae/" target="_blank" class="nav-link pl-0 pr-5">Team</a>
  <a href="http://www.sai-group.ae/contact-us/" target="_blank" class="nav-link pl-0 pr-0">Contact</a>
</div>
<!--end::Nav-->
</div>`;
} catch (error) {

}
document.getElementById("kt_quick_user").innerHTML =
   ` <!--begin::Header-->
                  <div class="offcanvas-header d-flex align-items-center justify-content-between pb-5">
                    <h3 class="font-weight-bold m-0">
                    User Profile
                    <!-- <small class="text-muted font-size-sm ml-2">12 messages</small></h3> -->
                    <a href="#" class="btn btn-xs btn-icon btn-light btn-hover-primary" id="kt_quick_user_close">
                    <i class="ki ki-close icon-xs text-muted"></i>
                    </a>
                  </div>
                  <!--end::Header-->
                  <!--begin::Content-->
                  <div class="offcanvas-content pr-5 mr-n5">
                    <!--begin::Header-->
                    <div class="d-flex align-items-center mt-5">
                        <div class="symbol symbol-100 mr-5">
                          <div class="symbol-label" style="background-image:url('assets/media/users/300_21.jpg')"></div>
                          <i class="symbol-badge bg-success"></i>
                        </div>
                        <div class="d-flex flex-column">
                          <a href="#" class="font-weight-bold font-size-h5 text-dark-75 text-hover-primary"  id="userProfileName">CRM User</a>
                          <div class="text-muted mt-1" id="branchRoleName">CEO</div>
                          <div class="navi mt-2">
                              <a href="#" class="navi-item">
                                <span class="navi-link p-0 pb-2">
                                    <span class="navi-icon mr-1">
                                      <span class="svg-icon svg-icon-lg svg-icon-primary">
                                          <!--begin::Svg Icon | path:assets/media/svg/icons/Communication/Mail-notification.svg-->
                                          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                <rect x="0" y="0" width="24" height="24" />
                                                <path d="M21,12.0829584 C20.6747915,12.0283988 20.3407122,12 20,12 C16.6862915,12 14,14.6862915 14,18 C14,18.3407122 14.0283988,18.6747915 14.0829584,19 L5,19 C3.8954305,19 3,18.1045695 3,17 L3,8 C3,6.8954305 3.8954305,6 5,6 L19,6 C20.1045695,6 21,6.8954305 21,8 L21,12.0829584 Z M18.1444251,7.83964668 L12,11.1481833 L5.85557487,7.83964668 C5.4908718,7.6432681 5.03602525,7.77972206 4.83964668,8.14442513 C4.6432681,8.5091282 4.77972206,8.96397475 5.14442513,9.16035332 L11.6444251,12.6603533 C11.8664074,12.7798822 12.1335926,12.7798822 12.3555749,12.6603533 L18.8555749,9.16035332 C19.2202779,8.96397475 19.3567319,8.5091282 19.1603533,8.14442513 C18.9639747,7.77972206 18.5091282,7.6432681 18.1444251,7.83964668 Z" fill="#000000" />
                                                <circle fill="#000000" opacity="0.3" cx="19.5" cy="17.5" r="2.5" />
                                            </g>
                                          </svg>
                                          <!--end::Svg Icon-->
                                      </span>
                                    </span>
                                    <span class="navi-text text-muted text-hover-primary" id="userEmail">ceo@sai-group.ae</span>
                                </span>
                              </a>
                              <button id="logout" class="btn btn-sm btn-light-primary font-weight-bolder py-2 px-5">Sign Out</button>
                          </div>
                        </div>
                    </div>
                    <!--end::Header-->
                    <!--begin::Separator-->
                    <div class="separator separator-dashed mt-8 mb-5"></div>
                    <!--end::Separator-->
                    <!--begin::Nav-->
                    <div class="navi navi-spacer-x-0 p-0">
                        <!--begin::Item-->
                        <a href="custom/apps/user/profile-1/personal-information.html" class="navi-item">
                          <div class="navi-link">
                              <div class="symbol symbol-40 bg-light mr-3">
                                <div class="symbol-label">
                                    <span class="svg-icon svg-icon-md svg-icon-success">
                                      <!--begin::Svg Icon | path:assets/media/svg/icons/General/Notification2.svg-->
                                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <rect x="0" y="0" width="24" height="24" />
                                            <path d="M13.2070325,4 C13.0721672,4.47683179 13,4.97998812 13,5.5 C13,8.53756612 15.4624339,11 18.5,11 C19.0200119,11 19.5231682,10.9278328 20,10.7929675 L20,17 C20,18.6568542 18.6568542,20 17,20 L7,20 C5.34314575,20 4,18.6568542 4,17 L4,7 C4,5.34314575 5.34314575,4 7,4 L13.2070325,4 Z" fill="#000000" />
                                            <circle fill="#000000" opacity="0.3" cx="18.5" cy="5.5" r="2.5" />
                                          </g>
                                      </svg>
                                      <!--end::Svg Icon-->
                                    </span>
                                </div>
                              </div>
                              <div class="navi-text">
                                <div class="font-weight-bold">My Profile</div>
                                <div class="text-muted">Account settings and more
                                    <span class="label label-light-danger label-inline font-weight-bold">update</span>
                                </div>
                              </div>
                          </div>
                        </a>
                        <!--end:Item-->
                        <!--begin::Item-->
                        <a href="custom/apps/user/profile-2.html" class="navi-item">
                          <div class="navi-link">
                              <div class="symbol symbol-40 bg-light mr-3">
                                <div class="symbol-label">
                                    <span class="svg-icon svg-icon-md svg-icon-danger">
                                      <!--begin::Svg Icon | path:assets/media/svg/icons/Files/Selected-file.svg-->
                                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <polygon points="0 0 24 0 24 24 0 24" />
                                            <path d="M4.85714286,1 L11.7364114,1 C12.0910962,1 12.4343066,1.12568431 12.7051108,1.35473959 L17.4686994,5.3839416 C17.8056532,5.66894833 18,6.08787823 18,6.52920201 L18,19.0833333 C18,20.8738751 17.9795521,21 16.1428571,21 L4.85714286,21 C3.02044787,21 3,20.8738751 3,19.0833333 L3,2.91666667 C3,1.12612489 3.02044787,1 4.85714286,1 Z M8,12 C7.44771525,12 7,12.4477153 7,13 C7,13.5522847 7.44771525,14 8,14 L15,14 C15.5522847,14 16,13.5522847 16,13 C16,12.4477153 15.5522847,12 15,12 L8,12 Z M8,16 C7.44771525,16 7,16.4477153 7,17 C7,17.5522847 7.44771525,18 8,18 L11,18 C11.5522847,18 12,17.5522847 12,17 C12,16.4477153 11.5522847,16 11,16 L8,16 Z" fill="#000000" fill-rule="nonzero" opacity="0.3" />
                                            <path d="M6.85714286,3 L14.7364114,3 C15.0910962,3 15.4343066,3.12568431 15.7051108,3.35473959 L20.4686994,7.3839416 C20.8056532,7.66894833 21,8.08787823 21,8.52920201 L21,21.0833333 C21,22.8738751 20.9795521,23 19.1428571,23 L6.85714286,23 C5.02044787,23 5,22.8738751 5,21.0833333 L5,4.91666667 C5,3.12612489 5.02044787,3 6.85714286,3 Z M8,12 C7.44771525,12 7,12.4477153 7,13 C7,13.5522847 7.44771525,14 8,14 L15,14 C15.5522847,14 16,13.5522847 16,13 C16,12.4477153 15.5522847,12 15,12 L8,12 Z M8,16 C7.44771525,16 7,16.4477153 7,17 C7,17.5522847 7.44771525,18 8,18 L11,18 C11.5522847,18 12,17.5522847 12,17 C12,16.4477153 11.5522847,16 11,16 L8,16 Z" fill="#000000" fill-rule="nonzero" />
                                          </g>
                                      </svg>
                                      <!--end::Svg Icon-->
                                    </span>
                                </div>
                              </div>
                              <div class="navi-text">
                                <div class="font-weight-bold">My Activities</div>
                                <div class="text-muted">Logs and notifications</div>
                              </div>
                          </div>
                        </a>
                        <!--end:Item-->
                        <!--begin::Item-->
                        <a href="custom/apps/userprofile-1/overview.html" class="navi-item">
                          <div class="navi-link">
                              <div class="symbol symbol-40 bg-light mr-3">
                                <div class="symbol-label">
                                    <span class="svg-icon svg-icon-md svg-icon-primary">
                                      <!--begin::Svg Icon | path:assets/media/svg/icons/Communication/Mail-opened.svg-->
                                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <rect x="0" y="0" width="24" height="24" />
                                            <path d="M6,2 L18,2 C18.5522847,2 19,2.44771525 19,3 L19,12 C19,12.5522847 18.5522847,13 18,13 L6,13 C5.44771525,13 5,12.5522847 5,12 L5,3 C5,2.44771525 5.44771525,2 6,2 Z M7.5,5 C7.22385763,5 7,5.22385763 7,5.5 C7,5.77614237 7.22385763,6 7.5,6 L13.5,6 C13.7761424,6 14,5.77614237 14,5.5 C14,5.22385763 13.7761424,5 13.5,5 L7.5,5 Z M7.5,7 C7.22385763,7 7,7.22385763 7,7.5 C7,7.77614237 7.22385763,8 7.5,8 L10.5,8 C10.7761424,8 11,7.77614237 11,7.5 C11,7.22385763 10.7761424,7 10.5,7 L7.5,7 Z" fill="#000000" opacity="0.3" />
                                            <path d="M3.79274528,6.57253826 L12,12.5 L20.2072547,6.57253826 C20.4311176,6.4108595 20.7436609,6.46126971 20.9053396,6.68513259 C20.9668779,6.77033951 21,6.87277228 21,6.97787787 L21,17 C21,18.1045695 20.1045695,19 19,19 L5,19 C3.8954305,19 3,18.1045695 3,17 L3,6.97787787 C3,6.70173549 3.22385763,6.47787787 3.5,6.47787787 C3.60510559,6.47787787 3.70753836,6.51099993 3.79274528,6.57253826 Z" fill="#000000" />
                                          </g>
                                      </svg>
                                      <!--end::Svg Icon-->
                                    </span>
                                </div>
                              </div>
                              <div class="navi-text">
                                <div class="font-weight-bold">My Tasks</div>
                                <div class="text-muted">latest tasks and projects</div>
                              </div>
                          </div>
                        </a>
                        <!--end:Item-->
                    </div>
                    <!--end::Nav-->
                    <!--begin::Separator-->
                    <div class="separator separator-dashed my-7"></div>
                    <!--end::Separator-->
                    <!--begin::Notifications-->
                    <div>
                        <!--begin:Heading-->
                        <h5 class="mb-5">Recent Notifications</h5>
                        <!--end:Heading-->
                        <!--begin::Item-->
                        <div class="d-flex align-items-center bg-light-warning rounded p-5 gutter-b">
                          <span class="svg-icon svg-icon-warning mr-5">
                              <span class="svg-icon svg-icon-lg">
                                <!--begin::Svg Icon | path:assets/media/svg/icons/Home/Library.svg-->
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                      <rect x="0" y="0" width="24" height="24" />
                                      <path d="M5,3 L6,3 C6.55228475,3 7,3.44771525 7,4 L7,20 C7,20.5522847 6.55228475,21 6,21 L5,21 C4.44771525,21 4,20.5522847 4,20 L4,4 C4,3.44771525 4.44771525,3 5,3 Z M10,3 L11,3 C11.5522847,3 12,3.44771525 12,4 L12,20 C12,20.5522847 11.5522847,21 11,21 L10,21 C9.44771525,21 9,20.5522847 9,20 L9,4 C9,3.44771525 9.44771525,3 10,3 Z" fill="#000000" />
                                      <rect fill="#000000" opacity="0.3" transform="translate(17.825568, 11.945519) rotate(-19.000000) translate(-17.825568, -11.945519)" x="16.3255682" y="2.94551858" width="3" height="18" rx="1" />
                                    </g>
                                </svg>
                                <!--end::Svg Icon-->
                              </span>
                          </span>
                          <div class="d-flex flex-column flex-grow-1 mr-2">
                              <a href="#" class="font-weight-normal text-dark-75 text-hover-primary font-size-lg mb-1">Another purpose persuade</a>
                              <span class="text-muted font-size-sm">Due in 2 Days</span>
                          </div>
                          <span class="font-weight-bolder text-warning py-1 font-size-lg">+28%</span>
                        </div>
                        <!--end::Item-->
                        <!--begin::Item-->
                        <div class="d-flex align-items-center bg-light-success rounded p-5 gutter-b">
                          <span class="svg-icon svg-icon-success mr-5">
                              <span class="svg-icon svg-icon-lg">
                                <!--begin::Svg Icon | path:assets/media/svg/icons/Communication/Write.svg-->
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                      <rect x="0" y="0" width="24" height="24" />
                                      <path d="M12.2674799,18.2323597 L12.0084872,5.45852451 C12.0004303,5.06114792 12.1504154,4.6768183 12.4255037,4.38993949 L15.0030167,1.70195304 L17.5910752,4.40093695 C17.8599071,4.6812911 18.0095067,5.05499603 18.0083938,5.44341307 L17.9718262,18.2062508 C17.9694575,19.0329966 17.2985816,19.701953 16.4718324,19.701953 L13.7671717,19.701953 C12.9505952,19.701953 12.2840328,19.0487684 12.2674799,18.2323597 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.701953, 10.701953) rotate(-135.000000) translate(-14.701953, -10.701953)" />
                                      <path d="M12.9,2 C13.4522847,2 13.9,2.44771525 13.9,3 C13.9,3.55228475 13.4522847,4 12.9,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,6 C2,3.790861 3.790861,2 6,2 L12.9,2 Z" fill="#000000" fill-rule="nonzero" opacity="0.3" />
                                    </g>
                                </svg>
                                <!--end::Svg Icon-->
                              </span>
                          </span>
                          <div class="d-flex flex-column flex-grow-1 mr-2">
                              <a href="#" class="font-weight-normal text-dark-75 text-hover-primary font-size-lg mb-1">Would be to people</a>
                              <span class="text-muted font-size-sm">Due in 2 Days</span>
                          </div>
                          <span class="font-weight-bolder text-success py-1 font-size-lg">+50%</span>
                        </div>
                        <!--end::Item-->
                        <!--begin::Item-->
                        <div class="d-flex align-items-center bg-light-danger rounded p-5 gutter-b">
                          <span class="svg-icon svg-icon-danger mr-5">
                              <span class="svg-icon svg-icon-lg">
                                <!--begin::Svg Icon | path:assets/media/svg/icons/Communication/Group-chat.svg-->
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                      <rect x="0" y="0" width="24" height="24" />
                                      <path d="M16,15.6315789 L16,12 C16,10.3431458 14.6568542,9 13,9 L6.16183229,9 L6.16183229,5.52631579 C6.16183229,4.13107011 7.29290239,3 8.68814808,3 L20.4776218,3 C21.8728674,3 23.0039375,4.13107011 23.0039375,5.52631579 L23.0039375,13.1052632 L23.0206157,17.786793 C23.0215995,18.0629336 22.7985408,18.2875874 22.5224001,18.2885711 C22.3891754,18.2890457 22.2612702,18.2363324 22.1670655,18.1421277 L19.6565168,15.6315789 L16,15.6315789 Z" fill="#000000" />
                                      <path d="M1.98505595,18 L1.98505595,13 C1.98505595,11.8954305 2.88048645,11 3.98505595,11 L11.9850559,11 C13.0896254,11 13.9850559,11.8954305 13.9850559,13 L13.9850559,18 C13.9850559,19.1045695 13.0896254,20 11.9850559,20 L4.10078614,20 L2.85693427,21.1905292 C2.65744295,21.3814685 2.34093638,21.3745358 2.14999706,21.1750444 C2.06092565,21.0819836 2.01120804,20.958136 2.01120804,20.8293182 L2.01120804,18.32426 C1.99400175,18.2187196 1.98505595,18.1104045 1.98505595,18 Z M6.5,14 C6.22385763,14 6,14.2238576 6,14.5 C6,14.7761424 6.22385763,15 6.5,15 L11.5,15 C11.7761424,15 12,14.7761424 12,14.5 C12,14.2238576 11.7761424,14 11.5,14 L6.5,14 Z M9.5,16 C9.22385763,16 9,16.2238576 9,16.5 C9,16.7761424 9.22385763,17 9.5,17 L11.5,17 C11.7761424,17 12,16.7761424 12,16.5 C12,16.2238576 11.7761424,16 11.5,16 L9.5,16 Z" fill="#000000" opacity="0.3" />
                                    </g>
                                </svg>
                                <!--end::Svg Icon-->
                              </span>
                          </span>
                          <div class="d-flex flex-column flex-grow-1 mr-2">
                              <a href="#" class="font-weight-normel text-dark-75 text-hover-primary font-size-lg mb-1">Purpose would be to persuade</a>
                              <span class="text-muted font-size-sm">Due in 2 Days</span>
                          </div>
                          <span class="font-weight-bolder text-danger py-1 font-size-lg">-27%</span>
                        </div>
                        <!--end::Item-->
                        <!--begin::Item-->
                        <div class="d-flex align-items-center bg-light-info rounded p-5">
                          <span class="svg-icon svg-icon-info mr-5">
                              <span class="svg-icon svg-icon-lg">
                                <!--begin::Svg Icon | path:assets/media/svg/icons/General/Attachment2.svg-->
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                      <rect x="0" y="0" width="24" height="24" />
                                      <path d="M11.7573593,15.2426407 L8.75735931,15.2426407 C8.20507456,15.2426407 7.75735931,15.6903559 7.75735931,16.2426407 C7.75735931,16.7949254 8.20507456,17.2426407 8.75735931,17.2426407 L11.7573593,17.2426407 L11.7573593,18.2426407 C11.7573593,19.3472102 10.8619288,20.2426407 9.75735931,20.2426407 L5.75735931,20.2426407 C4.65278981,20.2426407 3.75735931,19.3472102 3.75735931,18.2426407 L3.75735931,14.2426407 C3.75735931,13.1380712 4.65278981,12.2426407 5.75735931,12.2426407 L9.75735931,12.2426407 C10.8619288,12.2426407 11.7573593,13.1380712 11.7573593,14.2426407 L11.7573593,15.2426407 Z" fill="#000000" opacity="0.3" transform="translate(7.757359, 16.242641) rotate(-45.000000) translate(-7.757359, -16.242641)" />
                                      <path d="M12.2426407,8.75735931 L15.2426407,8.75735931 C15.7949254,8.75735931 16.2426407,8.30964406 16.2426407,7.75735931 C16.2426407,7.20507456 15.7949254,6.75735931 15.2426407,6.75735931 L12.2426407,6.75735931 L12.2426407,5.75735931 C12.2426407,4.65278981 13.1380712,3.75735931 14.2426407,3.75735931 L18.2426407,3.75735931 C19.3472102,3.75735931 20.2426407,4.65278981 20.2426407,5.75735931 L20.2426407,9.75735931 C20.2426407,10.8619288 19.3472102,11.7573593 18.2426407,11.7573593 L14.2426407,11.7573593 C13.1380712,11.7573593 12.2426407,10.8619288 12.2426407,9.75735931 L12.2426407,8.75735931 Z" fill="#000000" transform="translate(16.242641, 7.757359) rotate(-45.000000) translate(-16.242641, -7.757359)" />
                                      <path d="M5.89339828,3.42893219 C6.44568303,3.42893219 6.89339828,3.87664744 6.89339828,4.42893219 L6.89339828,6.42893219 C6.89339828,6.98121694 6.44568303,7.42893219 5.89339828,7.42893219 C5.34111353,7.42893219 4.89339828,6.98121694 4.89339828,6.42893219 L4.89339828,4.42893219 C4.89339828,3.87664744 5.34111353,3.42893219 5.89339828,3.42893219 Z M11.4289322,5.13603897 C11.8194565,5.52656326 11.8194565,6.15972824 11.4289322,6.55025253 L10.0147186,7.96446609 C9.62419433,8.35499039 8.99102936,8.35499039 8.60050506,7.96446609 C8.20998077,7.5739418 8.20998077,6.94077682 8.60050506,6.55025253 L10.0147186,5.13603897 C10.4052429,4.74551468 11.0384079,4.74551468 11.4289322,5.13603897 Z M0.600505063,5.13603897 C0.991029355,4.74551468 1.62419433,4.74551468 2.01471863,5.13603897 L3.42893219,6.55025253 C3.81945648,6.94077682 3.81945648,7.5739418 3.42893219,7.96446609 C3.0384079,8.35499039 2.40524292,8.35499039 2.01471863,7.96446609 L0.600505063,6.55025253 C0.209980772,6.15972824 0.209980772,5.52656326 0.600505063,5.13603897 Z" fill="#000000" opacity="0.3" transform="translate(6.014719, 5.843146) rotate(-45.000000) translate(-6.014719, -5.843146)" />
                                      <path d="M17.9142136,15.4497475 C18.4664983,15.4497475 18.9142136,15.8974627 18.9142136,16.4497475 L18.9142136,18.4497475 C18.9142136,19.0020322 18.4664983,19.4497475 17.9142136,19.4497475 C17.3619288,19.4497475 16.9142136,19.0020322 16.9142136,18.4497475 L16.9142136,16.4497475 C16.9142136,15.8974627 17.3619288,15.4497475 17.9142136,15.4497475 Z M23.4497475,17.1568542 C23.8402718,17.5473785 23.8402718,18.1805435 23.4497475,18.5710678 L22.0355339,19.9852814 C21.6450096,20.3758057 21.0118446,20.3758057 20.6213203,19.9852814 C20.2307961,19.5947571 20.2307961,18.9615921 20.6213203,18.5710678 L22.0355339,17.1568542 C22.4260582,16.76633 23.0592232,16.76633 23.4497475,17.1568542 Z M12.6213203,17.1568542 C13.0118446,16.76633 13.6450096,16.76633 14.0355339,17.1568542 L15.4497475,18.5710678 C15.8402718,18.9615921 15.8402718,19.5947571 15.4497475,19.9852814 C15.0592232,20.3758057 14.4260582,20.3758057 14.0355339,19.9852814 L12.6213203,18.5710678 C12.2307961,18.1805435 12.2307961,17.5473785 12.6213203,17.1568542 Z" fill="#000000" opacity="0.3" transform="translate(18.035534, 17.863961) scale(1, -1) rotate(45.000000) translate(-18.035534, -17.863961)" />
                                    </g>
                                </svg>
                                <!--end::Svg Icon-->
                              </span>
                          </span>
                          <div class="d-flex flex-column flex-grow-1 mr-2">
                              <a href="#" class="font-weight-normel text-dark-75 text-hover-primary font-size-lg mb-1">The best product</a>
                              <span class="text-muted font-size-sm">Due in 2 Days</span>
                          </div>
                          <span class="font-weight-bolder text-info py-1 font-size-lg">+8%</span>
                        </div>
                        <!--end::Item-->
                    </div>
                    <!--end::Notifications-->
                  </div>
                  <!--end::Content-->`;
document.getElementById("kt_quick_panel").innerHTML =
   `<!--begin::Header-->
                <div class="offcanvas-header offcanvas-header-navs d-flex align-items-center justify-content-between mb-5">
                  <ul class="nav nav-bold nav-tabs nav-tabs-line nav-tabs-line-3x nav-tabs-primary flex-grow-1 px-10" role="tablist">
                      <li class="nav-item">
                        <a class="nav-link active" data-toggle="tab" href="#kt_quick_panel_logs">Audit Logs</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#kt_quick_panel_notifications">Notifications</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#kt_quick_panel_settings">Settings</a>
                      </li>
                  </ul>
                  <div class="offcanvas-close mt-n1 pr-5">
                      <a href="#" class="btn btn-xs btn-icon btn-light btn-hover-primary" id="kt_quick_panel_close">
                      <i class="ki ki-close icon-xs text-muted"></i>
                      </a>
                  </div>
                </div>
                <!--end::Header-->
                <!--begin::Content-->
                <div class="offcanvas-content px-10">
                  <div class="tab-content">
                      <!--begin::Tabpane-->
                      <div class="tab-pane fade show pt-3 pr-5 mr-n5 active" id="kt_quick_panel_logs" role="tabpanel">
                        <!--begin::Section-->
                        <div class="mb-15">
                            <h5 class="font-weight-bold mb-5">System Messages</h5>
                            <!--begin: Item-->
                            <div class="d-flex align-items-center flex-wrap mb-5">
                              <div class="symbol symbol-50 symbol-light mr-5">
                                  <span class="symbol-label">
                                  <img src="assets/media/svg/misc/006-plurk.svg" class="h-50 align-self-center" alt="" />
                                  </span>
                              </div>
                              <div class="d-flex flex-column flex-grow-1 mr-2">
                                  <a href="#" class="font-weight-bolder text-dark-75 text-hover-primary font-size-lg mb-1">Top Authors</a>
                                  <span class="text-muted font-weight-bold">Most Successful Fellas</span>
                              </div>
                              <span class="btn btn-sm btn-light font-weight-bolder py-1 my-lg-0 my-2 text-dark-50">+82$</span>
                            </div>
                            <!--end: Item-->
                            <!--begin: Item-->
                            <div class="d-flex align-items-center flex-wrap mb-5">
                              <div class="symbol symbol-50 symbol-light mr-5">
                                  <span class="symbol-label">
                                  <img src="assets/media/svg/misc/015-telegram.svg" class="h-50 align-self-center" alt="" />
                                  </span>
                              </div>
                              <div class="d-flex flex-column flex-grow-1 mr-2">
                                  <a href="#" class="font-weight-bolder text-dark-75 text-hover-primary font-size-lg mb-1">Popular Authors</a>
                                  <span class="text-muted font-weight-bold">Most Successful Fellas</span>
                              </div>
                              <span class="btn btn-sm btn-light font-weight-bolder my-lg-0 my-2 py-1 text-dark-50">+280$</span>
                            </div>
                            <!--end: Item-->
                            <!--begin: Item-->
                            <div class="d-flex align-items-center flex-wrap mb-5">
                              <div class="symbol symbol-50 symbol-light mr-5">
                                  <span class="symbol-label">
                                  <img src="assets/media/svg/misc/003-puzzle.svg" class="h-50 align-self-center" alt="" />
                                  </span>
                              </div>
                              <div class="d-flex flex-column flex-grow-1 mr-2">
                                  <a href="#" class="font-weight-bolder text-dark-75 text-hover-primary font-size-lg mb-1">New Users</a>
                                  <span class="text-muted font-weight-bold">Most Successful Fellas</span>
                              </div>
                              <span class="btn btn-sm btn-light font-weight-bolder my-lg-0 my-2 py-1 text-dark-50">+4500$</span>
                            </div>
                            <!--end: Item-->
                            <!--begin: Item-->
                            <div class="d-flex align-items-center flex-wrap mb-5">
                              <div class="symbol symbol-50 symbol-light mr-5">
                                  <span class="symbol-label">
                                  <img src="assets/media/svg/misc/005-bebo.svg" class="h-50 align-self-center" alt="" />
                                  </span>
                              </div>
                              <div class="d-flex flex-column flex-grow-1 mr-2">
                                  <a href="#" class="font-weight-bolder text-dark-75 text-hover-primary font-size-lg mb-1">Active Customers</a>
                                  <span class="text-muted font-weight-bold">Most Successful Fellas</span>
                              </div>
                              <span class="btn btn-sm btn-light font-weight-bolder my-lg-0 my-2 py-1 text-dark-50">+4500$</span>
                            </div>
                            <!--end: Item-->
                            <!--begin: Item-->
                            <div class="d-flex align-items-center flex-wrap">
                              <div class="symbol symbol-50 symbol-light mr-5">
                                  <span class="symbol-label">
                                  <img src="assets/media/svg/misc/014-kickstarter.svg" class="h-50 align-self-center" alt="" />
                                  </span>
                              </div>
                              <div class="d-flex flex-column flex-grow-1 mr-2">
                                  <a href="#" class="font-weight-bolder text-dark-75 text-hover-primary font-size-lg mb-1">Bestseller Theme</a>
                                  <span class="text-muted font-weight-bold">Most Successful Fellas</span>
                              </div>
                              <span class="btn btn-sm btn-light font-weight-bolder my-lg-0 my-2 py-1 text-dark-50">+4500$</span>
                            </div>
                            <!--end: Item-->
                        </div>
                        <!--end::Section-->
                        <!--begin::Section-->
                        <div class="mb-5">
                            <h5 class="font-weight-bold mb-5">Notifications</h5>
                            <!--begin: Item-->
                            <div class="d-flex align-items-center bg-light-warning rounded p-5 mb-5">
                              <span class="svg-icon svg-icon-warning mr-5">
                                  <span class="svg-icon svg-icon-lg">
                                    <!--begin::Svg Icon | path:assets/media/svg/icons/Home/Library.svg-->
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                          <rect x="0" y="0" width="24" height="24" />
                                          <path d="M5,3 L6,3 C6.55228475,3 7,3.44771525 7,4 L7,20 C7,20.5522847 6.55228475,21 6,21 L5,21 C4.44771525,21 4,20.5522847 4,20 L4,4 C4,3.44771525 4.44771525,3 5,3 Z M10,3 L11,3 C11.5522847,3 12,3.44771525 12,4 L12,20 C12,20.5522847 11.5522847,21 11,21 L10,21 C9.44771525,21 9,20.5522847 9,20 L9,4 C9,3.44771525 9.44771525,3 10,3 Z" fill="#000000" />
                                          <rect fill="#000000" opacity="0.3" transform="translate(17.825568, 11.945519) rotate(-19.000000) translate(-17.825568, -11.945519)" x="16.3255682" y="2.94551858" width="3" height="18" rx="1" />
                                        </g>
                                    </svg>
                                    <!--end::Svg Icon-->
                                  </span>
                              </span>
                              <div class="d-flex flex-column flex-grow-1 mr-2">
                                  <a href="#" class="font-weight-normal text-dark-75 text-hover-primary font-size-lg mb-1">Another purpose persuade</a>
                                  <span class="text-muted font-size-sm">Due in 2 Days</span>
                              </div>
                              <span class="font-weight-bolder text-warning py-1 font-size-lg">+28%</span>
                            </div>
                            <!--end: Item-->
                            <!--begin: Item-->
                            <div class="d-flex align-items-center bg-light-success rounded p-5 mb-5">
                              <span class="svg-icon svg-icon-success mr-5">
                                  <span class="svg-icon svg-icon-lg">
                                    <!--begin::Svg Icon | path:assets/media/svg/icons/Communication/Write.svg-->
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                          <rect x="0" y="0" width="24" height="24" />
                                          <path d="M12.2674799,18.2323597 L12.0084872,5.45852451 C12.0004303,5.06114792 12.1504154,4.6768183 12.4255037,4.38993949 L15.0030167,1.70195304 L17.5910752,4.40093695 C17.8599071,4.6812911 18.0095067,5.05499603 18.0083938,5.44341307 L17.9718262,18.2062508 C17.9694575,19.0329966 17.2985816,19.701953 16.4718324,19.701953 L13.7671717,19.701953 C12.9505952,19.701953 12.2840328,19.0487684 12.2674799,18.2323597 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.701953, 10.701953) rotate(-135.000000) translate(-14.701953, -10.701953)" />
                                          <path d="M12.9,2 C13.4522847,2 13.9,2.44771525 13.9,3 C13.9,3.55228475 13.4522847,4 12.9,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,6 C2,3.790861 3.790861,2 6,2 L12.9,2 Z" fill="#000000" fill-rule="nonzero" opacity="0.3" />
                                        </g>
                                    </svg>
                                    <!--end::Svg Icon-->
                                  </span>
                              </span>
                              <div class="d-flex flex-column flex-grow-1 mr-2">
                                  <a href="#" class="font-weight-normal text-dark-75 text-hover-primary font-size-lg mb-1">Would be to people</a>
                                  <span class="text-muted font-size-sm">Due in 2 Days</span>
                              </div>
                              <span class="font-weight-bolder text-success py-1 font-size-lg">+50%</span>
                            </div>
                            <!--end: Item-->
                            <!--begin: Item-->
                            <div class="d-flex align-items-center bg-light-danger rounded p-5 mb-5">
                              <span class="svg-icon svg-icon-danger mr-5">
                                  <span class="svg-icon svg-icon-lg">
                                    <!--begin::Svg Icon | path:assets/media/svg/icons/Communication/Group-chat.svg-->
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                          <rect x="0" y="0" width="24" height="24" />
                                          <path d="M16,15.6315789 L16,12 C16,10.3431458 14.6568542,9 13,9 L6.16183229,9 L6.16183229,5.52631579 C6.16183229,4.13107011 7.29290239,3 8.68814808,3 L20.4776218,3 C21.8728674,3 23.0039375,4.13107011 23.0039375,5.52631579 L23.0039375,13.1052632 L23.0206157,17.786793 C23.0215995,18.0629336 22.7985408,18.2875874 22.5224001,18.2885711 C22.3891754,18.2890457 22.2612702,18.2363324 22.1670655,18.1421277 L19.6565168,15.6315789 L16,15.6315789 Z" fill="#000000" />
                                          <path d="M1.98505595,18 L1.98505595,13 C1.98505595,11.8954305 2.88048645,11 3.98505595,11 L11.9850559,11 C13.0896254,11 13.9850559,11.8954305 13.9850559,13 L13.9850559,18 C13.9850559,19.1045695 13.0896254,20 11.9850559,20 L4.10078614,20 L2.85693427,21.1905292 C2.65744295,21.3814685 2.34093638,21.3745358 2.14999706,21.1750444 C2.06092565,21.0819836 2.01120804,20.958136 2.01120804,20.8293182 L2.01120804,18.32426 C1.99400175,18.2187196 1.98505595,18.1104045 1.98505595,18 Z M6.5,14 C6.22385763,14 6,14.2238576 6,14.5 C6,14.7761424 6.22385763,15 6.5,15 L11.5,15 C11.7761424,15 12,14.7761424 12,14.5 C12,14.2238576 11.7761424,14 11.5,14 L6.5,14 Z M9.5,16 C9.22385763,16 9,16.2238576 9,16.5 C9,16.7761424 9.22385763,17 9.5,17 L11.5,17 C11.7761424,17 12,16.7761424 12,16.5 C12,16.2238576 11.7761424,16 11.5,16 L9.5,16 Z" fill="#000000" opacity="0.3" />
                                        </g>
                                    </svg>
                                    <!--end::Svg Icon-->
                                  </span>
                              </span>
                              <div class="d-flex flex-column flex-grow-1 mr-2">
                                  <a href="#" class="font-weight-normel text-dark-75 text-hover-primary font-size-lg mb-1">Purpose would be to persuade</a>
                                  <span class="text-muted font-size-sm">Due in 2 Days</span>
                              </div>
                              <span class="font-weight-bolder text-danger py-1 font-size-lg">-27%</span>
                            </div>
                            <!--end: Item-->
                            <!--begin: Item-->
                            <div class="d-flex align-items-center bg-light-info rounded p-5">
                              <span class="svg-icon svg-icon-info mr-5">
                                  <span class="svg-icon svg-icon-lg">
                                    <!--begin::Svg Icon | path:assets/media/svg/icons/General/Attachment2.svg-->
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                          <rect x="0" y="0" width="24" height="24" />
                                          <path d="M11.7573593,15.2426407 L8.75735931,15.2426407 C8.20507456,15.2426407 7.75735931,15.6903559 7.75735931,16.2426407 C7.75735931,16.7949254 8.20507456,17.2426407 8.75735931,17.2426407 L11.7573593,17.2426407 L11.7573593,18.2426407 C11.7573593,19.3472102 10.8619288,20.2426407 9.75735931,20.2426407 L5.75735931,20.2426407 C4.65278981,20.2426407 3.75735931,19.3472102 3.75735931,18.2426407 L3.75735931,14.2426407 C3.75735931,13.1380712 4.65278981,12.2426407 5.75735931,12.2426407 L9.75735931,12.2426407 C10.8619288,12.2426407 11.7573593,13.1380712 11.7573593,14.2426407 L11.7573593,15.2426407 Z" fill="#000000" opacity="0.3" transform="translate(7.757359, 16.242641) rotate(-45.000000) translate(-7.757359, -16.242641)" />
                                          <path d="M12.2426407,8.75735931 L15.2426407,8.75735931 C15.7949254,8.75735931 16.2426407,8.30964406 16.2426407,7.75735931 C16.2426407,7.20507456 15.7949254,6.75735931 15.2426407,6.75735931 L12.2426407,6.75735931 L12.2426407,5.75735931 C12.2426407,4.65278981 13.1380712,3.75735931 14.2426407,3.75735931 L18.2426407,3.75735931 C19.3472102,3.75735931 20.2426407,4.65278981 20.2426407,5.75735931 L20.2426407,9.75735931 C20.2426407,10.8619288 19.3472102,11.7573593 18.2426407,11.7573593 L14.2426407,11.7573593 C13.1380712,11.7573593 12.2426407,10.8619288 12.2426407,9.75735931 L12.2426407,8.75735931 Z" fill="#000000" transform="translate(16.242641, 7.757359) rotate(-45.000000) translate(-16.242641, -7.757359)" />
                                          <path d="M5.89339828,3.42893219 C6.44568303,3.42893219 6.89339828,3.87664744 6.89339828,4.42893219 L6.89339828,6.42893219 C6.89339828,6.98121694 6.44568303,7.42893219 5.89339828,7.42893219 C5.34111353,7.42893219 4.89339828,6.98121694 4.89339828,6.42893219 L4.89339828,4.42893219 C4.89339828,3.87664744 5.34111353,3.42893219 5.89339828,3.42893219 Z M11.4289322,5.13603897 C11.8194565,5.52656326 11.8194565,6.15972824 11.4289322,6.55025253 L10.0147186,7.96446609 C9.62419433,8.35499039 8.99102936,8.35499039 8.60050506,7.96446609 C8.20998077,7.5739418 8.20998077,6.94077682 8.60050506,6.55025253 L10.0147186,5.13603897 C10.4052429,4.74551468 11.0384079,4.74551468 11.4289322,5.13603897 Z M0.600505063,5.13603897 C0.991029355,4.74551468 1.62419433,4.74551468 2.01471863,5.13603897 L3.42893219,6.55025253 C3.81945648,6.94077682 3.81945648,7.5739418 3.42893219,7.96446609 C3.0384079,8.35499039 2.40524292,8.35499039 2.01471863,7.96446609 L0.600505063,6.55025253 C0.209980772,6.15972824 0.209980772,5.52656326 0.600505063,5.13603897 Z" fill="#000000" opacity="0.3" transform="translate(6.014719, 5.843146) rotate(-45.000000) translate(-6.014719, -5.843146)" />
                                          <path d="M17.9142136,15.4497475 C18.4664983,15.4497475 18.9142136,15.8974627 18.9142136,16.4497475 L18.9142136,18.4497475 C18.9142136,19.0020322 18.4664983,19.4497475 17.9142136,19.4497475 C17.3619288,19.4497475 16.9142136,19.0020322 16.9142136,18.4497475 L16.9142136,16.4497475 C16.9142136,15.8974627 17.3619288,15.4497475 17.9142136,15.4497475 Z M23.4497475,17.1568542 C23.8402718,17.5473785 23.8402718,18.1805435 23.4497475,18.5710678 L22.0355339,19.9852814 C21.6450096,20.3758057 21.0118446,20.3758057 20.6213203,19.9852814 C20.2307961,19.5947571 20.2307961,18.9615921 20.6213203,18.5710678 L22.0355339,17.1568542 C22.4260582,16.76633 23.0592232,16.76633 23.4497475,17.1568542 Z M12.6213203,17.1568542 C13.0118446,16.76633 13.6450096,16.76633 14.0355339,17.1568542 L15.4497475,18.5710678 C15.8402718,18.9615921 15.8402718,19.5947571 15.4497475,19.9852814 C15.0592232,20.3758057 14.4260582,20.3758057 14.0355339,19.9852814 L12.6213203,18.5710678 C12.2307961,18.1805435 12.2307961,17.5473785 12.6213203,17.1568542 Z" fill="#000000" opacity="0.3" transform="translate(18.035534, 17.863961) scale(1, -1) rotate(45.000000) translate(-18.035534, -17.863961)" />
                                        </g>
                                    </svg>
                                    <!--end::Svg Icon-->
                                  </span>
                              </span>
                              <div class="d-flex flex-column flex-grow-1 mr-2">
                                  <a href="#" class="font-weight-normel text-dark-75 text-hover-primary font-size-lg mb-1">The best product</a>
                                  <span class="text-muted font-size-sm">Due in 2 Days</span>
                              </div>
                              <span class="font-weight-bolder text-info py-1 font-size-lg">+8%</span>
                            </div>
                            <!--end: Item-->
                        </div>
                        <!--end::Section-->
                      </div>
                      <!--end::Tabpane-->
                      <!--begin::Tabpane-->
                      <div class="tab-pane fade pt-2 pr-5 mr-n5" id="kt_quick_panel_notifications" role="tabpanel">
                        <!--begin::Nav-->
                        <div class="navi navi-icon-circle navi-spacer-x-0">
                            <!--begin::Item-->
                            <a href="#" class="navi-item">
                              <div class="navi-link rounded">
                                  <div class="symbol symbol-50 mr-3">
                                    <div class="symbol-label">
                                        <i class="flaticon-bell text-success icon-lg"></i>
                                    </div>
                                  </div>
                                  <div class="navi-text">
                                    <div class="font-weight-bold font-size-lg">5 new user generated report</div>
                                    <div class="text-muted">Reports based on sales</div>
                                  </div>
                              </div>
                            </a>
                            <!--end::Item-->
                            <!--begin::Item-->
                            <a href="#" class="navi-item">
                              <div class="navi-link rounded">
                                  <div class="symbol symbol-50 mr-3">
                                    <div class="symbol-label">
                                        <i class="flaticon2-box text-danger icon-lg"></i>
                                    </div>
                                  </div>
                                  <div class="navi-text">
                                    <div class="font-weight-bold font-size-lg">2 new items submited</div>
                                    <div class="text-muted">by Grog John</div>
                                  </div>
                              </div>
                            </a>
                            <!--end::Item-->
                            <!--begin::Item-->
                            <a href="#" class="navi-item">
                              <div class="navi-link rounded">
                                  <div class="symbol symbol-50 mr-3">
                                    <div class="symbol-label">
                                        <i class="flaticon-psd text-primary icon-lg"></i>
                                    </div>
                                  </div>
                                  <div class="navi-text">
                                    <div class="font-weight-bold font-size-lg">79 PSD files generated</div>
                                    <div class="text-muted">Reports based on sales</div>
                                  </div>
                              </div>
                            </a>
                            <!--end::Item-->
                            <!--begin::Item-->
                            <a href="#" class="navi-item">
                              <div class="navi-link rounded">
                                  <div class="symbol symbol-50 mr-3">
                                    <div class="symbol-label">
                                        <i class="flaticon2-supermarket text-warning icon-lg"></i>
                                    </div>
                                  </div>
                                  <div class="navi-text">
                                    <div class="font-weight-bold font-size-lg">$2900 worth producucts sold</div>
                                    <div class="text-muted">Total 234 items</div>
                                  </div>
                              </div>
                            </a>
                            <!--end::Item-->
                            <!--begin::Item-->
                            <a href="#" class="navi-item">
                              <div class="navi-link rounded">
                                  <div class="symbol symbol-50 mr-3">
                                    <div class="symbol-label">
                                        <i class="flaticon-paper-plane-1 text-success icon-lg"></i>
                                    </div>
                                  </div>
                                  <div class="navi-text">
                                    <div class="font-weight-bold font-size-lg">4.5h-avarage response time</div>
                                    <div class="text-muted">Fostest is Barry</div>
                                  </div>
                              </div>
                            </a>
                            <!--end::Item-->
                            <!--begin::Item-->
                            <a href="#" class="navi-item">
                              <div class="navi-link rounded">
                                  <div class="symbol symbol-50 mr-3">
                                    <div class="symbol-label">
                                        <i class="flaticon-safe-shield-protection text-danger icon-lg"></i>
                                    </div>
                                  </div>
                                  <div class="navi-text">
                                    <div class="font-weight-bold font-size-lg">3 Defence alerts</div>
                                    <div class="text-muted">40% less alerts thar last week</div>
                                  </div>
                              </div>
                            </a>
                            <!--end::Item-->
                            <!--begin::Item-->
                            <a href="#" class="navi-item">
                              <div class="navi-link rounded">
                                  <div class="symbol symbol-50 mr-3">
                                    <div class="symbol-label">
                                        <i class="flaticon-notepad text-primary icon-lg"></i>
                                    </div>
                                  </div>
                                  <div class="navi-text">
                                    <div class="font-weight-bold font-size-lg">Avarage 4 blog posts per author</div>
                                    <div class="text-muted">Most posted 12 time</div>
                                  </div>
                              </div>
                            </a>
                            <!--end::Item-->
                            <!--begin::Item-->
                            <a href="#" class="navi-item">
                              <div class="navi-link rounded">
                                  <div class="symbol symbol-50 mr-3">
                                    <div class="symbol-label">
                                        <i class="flaticon-users-1 text-warning icon-lg"></i>
                                    </div>
                                  </div>
                                  <div class="navi-text">
                                    <div class="font-weight-bold font-size-lg">16 authors joined last week</div>
                                    <div class="text-muted">9 photodrapehrs, 7 designer</div>
                                  </div>
                              </div>
                            </a>
                            <!--end::Item-->
                            <!--begin::Item-->
                            <a href="#" class="navi-item">
                              <div class="navi-link rounded">
                                  <div class="symbol symbol-50 mr-3">
                                    <div class="symbol-label">
                                        <i class="flaticon2-box text-info icon-lg"></i>
                                    </div>
                                  </div>
                                  <div class="navi-text">
                                    <div class="font-weight-bold font-size-lg">2 new items have been submited</div>
                                    <div class="text-muted">by Grog John</div>
                                  </div>
                              </div>
                            </a>
                            <!--end::Item-->
                            <!--begin::Item-->
                            <a href="#" class="navi-item">
                              <div class="navi-link rounded">
                                  <div class="symbol symbol-50 mr-3">
                                    <div class="symbol-label">
                                        <i class="flaticon2-download text-success icon-lg"></i>
                                    </div>
                                  </div>
                                  <div class="navi-text">
                                    <div class="font-weight-bold font-size-lg">2.8 GB-total downloads size</div>
                                    <div class="text-muted">Mostly PSD end AL concepts</div>
                                  </div>
                              </div>
                            </a>
                            <!--end::Item-->
                            <!--begin::Item-->
                            <a href="#" class="navi-item">
                              <div class="navi-link rounded">
                                  <div class="symbol symbol-50 mr-3">
                                    <div class="symbol-label">
                                        <i class="flaticon2-supermarket text-danger icon-lg"></i>
                                    </div>
                                  </div>
                                  <div class="navi-text">
                                    <div class="font-weight-bold font-size-lg">$2900 worth producucts sold</div>
                                    <div class="text-muted">Total 234 items</div>
                                  </div>
                              </div>
                            </a>
                            <!--end::Item-->
                            <!--begin::Item-->
                            <a href="#" class="navi-item">
                              <div class="navi-link rounded">
                                  <div class="symbol symbol-50 mr-3">
                                    <div class="symbol-label">
                                        <i class="flaticon-bell text-primary icon-lg"></i>
                                    </div>
                                  </div>
                                  <div class="navi-text">
                                    <div class="font-weight-bold font-size-lg">7 new user generated report</div>
                                    <div class="text-muted">Reports based on sales</div>
                                  </div>
                              </div>
                            </a>
                            <!--end::Item-->
                            <!--begin::Item-->
                            <a href="#" class="navi-item">
                              <div class="navi-link rounded">
                                  <div class="symbol symbol-50 mr-3">
                                    <div class="symbol-label">
                                        <i class="flaticon-paper-plane-1 text-success icon-lg"></i>
                                    </div>
                                  </div>
                                  <div class="navi-text">
                                    <div class="font-weight-bold font-size-lg">4.5h-avarage response time</div>
                                    <div class="text-muted">Fostest is Barry</div>
                                  </div>
                              </div>
                            </a>
                            <!--end::Item-->
                        </div>
                        <!--end::Nav-->
                      </div>
                      <!--end::Tabpane-->
                      <!--begin::Tabpane-->
                      <div class="tab-pane fade pt-3 pr-5 mr-n5" id="kt_quick_panel_settings" role="tabpanel">
                        <form class="form">
                            <!--begin::Section-->
                            <div>
                              <h5 class="font-weight-bold mb-3">Customer Care</h5>
                              <div class="form-group mb-0 row align-items-center">
                                  <label class="col-8 col-form-label">Enable Notifications:</label>
                                  <div class="col-4 d-flex justify-content-end">
                                    <span class="switch switch-success switch-sm">
                                    <label>
                                    <input type="checkbox" checked="checked" name="select" />
                                    <span></span>
                                    </label>
                                    </span>
                                  </div>
                              </div>
                              <div class="form-group mb-0 row align-items-center">
                                  <label class="col-8 col-form-label">Enable Case Tracking:</label>
                                  <div class="col-4 d-flex justify-content-end">
                                    <span class="switch switch-success switch-sm">
                                    <label>
                                    <input type="checkbox" name="quick_panel_notifications_2" />
                                    <span></span>
                                    </label>
                                    </span>
                                  </div>
                              </div>
                              <div class="form-group mb-0 row align-items-center">
                                  <label class="col-8 col-form-label">Support Portal:</label>
                                  <div class="col-4 d-flex justify-content-end">
                                    <span class="switch switch-success switch-sm">
                                    <label>
                                    <input type="checkbox" checked="checked" name="select" />
                                    <span></span>
                                    </label>
                                    </span>
                                  </div>
                              </div>
                            </div>
                            <!--end::Section-->
                            <div class="separator separator-dashed my-6"></div>
                            <!--begin::Section-->
                            <div class="pt-2">
                              <h5 class="font-weight-bold mb-3">Reports</h5>
                              <div class="form-group mb-0 row align-items-center">
                                  <label class="col-8 col-form-label">Generate Reports:</label>
                                  <div class="col-4 d-flex justify-content-end">
                                    <span class="switch switch-sm switch-danger">
                                    <label>
                                    <input type="checkbox" checked="checked" name="select" />
                                    <span></span>
                                    </label>
                                    </span>
                                  </div>
                              </div>
                              <div class="form-group mb-0 row align-items-center">
                                  <label class="col-8 col-form-label">Enable Report Export:</label>
                                  <div class="col-4 d-flex justify-content-end">
                                    <span class="switch switch-sm switch-danger">
                                    <label>
                                    <input type="checkbox" name="select" />
                                    <span></span>
                                    </label>
                                    </span>
                                  </div>
                              </div>
                              <div class="form-group mb-0 row align-items-center">
                                  <label class="col-8 col-form-label">Allow Data Collection:</label>
                                  <div class="col-4 d-flex justify-content-end">
                                    <span class="switch switch-sm switch-danger">
                                    <label>
                                    <input type="checkbox" checked="checked" name="select" />
                                    <span></span>
                                    </label>
                                    </span>
                                  </div>
                              </div>
                            </div>
                            <!--end::Section-->
                            <div class="separator separator-dashed my-6"></div>
                            <!--begin::Section-->
                            <div class="pt-2">
                              <h5 class="font-weight-bold mb-3">Memebers</h5>
                              <div class="form-group mb-0 row align-items-center">
                                  <label class="col-8 col-form-label">Enable Member singup:</label>
                                  <div class="col-4 d-flex justify-content-end">
                                    <span class="switch switch-sm switch-primary">
                                    <label>
                                    <input type="checkbox" checked="checked" name="select" />
                                    <span></span>
                                    </label>
                                    </span>
                                  </div>
                              </div>
                              <div class="form-group mb-0 row align-items-center">
                                  <label class="col-8 col-form-label">Allow User Feedbacks:</label>
                                  <div class="col-4 d-flex justify-content-end">
                                    <span class="switch switch-sm switch-primary">
                                    <label>
                                    <input type="checkbox" name="select" />
                                    <span></span>
                                    </label>
                                    </span>
                                  </div>
                              </div>
                              <div class="form-group mb-0 row align-items-center">
                                  <label class="col-8 col-form-label">Enable Customer Portal:</label>
                                  <div class="col-4 d-flex justify-content-end">
                                    <span class="switch switch-sm switch-primary">
                                    <label>
                                    <input type="checkbox" checked="checked" name="select" />
                                    <span></span>
                                    </label>
                                    </span>
                                  </div>
                              </div>
                            </div>
                            <!--end::Section-->
                        </form>
                      </div>
                      <!--end::Tabpane-->
                  </div>
                </div>
                <!--end::Content-->`;
document.getElementById("kt_scrolltop").innerHTML =
   `<span class="svg-icon">
            <!--begin::Svg Icon | path:assets/media/svg/icons/Navigation/Up-2.svg-->
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <polygon points="0 0 24 0 24 24 0 24" />
                  <rect fill="#000000" opacity="0.3" x="11" y="10" width="2" height="10" rx="1" />
                  <path d="M6.70710678,12.7071068 C6.31658249,13.0976311 5.68341751,13.0976311 5.29289322,12.7071068 C4.90236893,12.3165825 4.90236893,11.6834175 5.29289322,11.2928932 L11.2928932,5.29289322 C11.6714722,4.91431428 12.2810586,4.90106866 12.6757246,5.26284586 L18.6757246,10.7628459 C19.0828436,11.1360383 19.1103465,11.7686056 18.7371541,12.1757246 C18.3639617,12.5828436 17.7313944,12.6103465 17.3242754,12.2371541 L12.0300757,7.38413782 L6.70710678,12.7071068 Z" fill="#000000" fill-rule="nonzero" />
              </g>
            </svg>
            <!--end::Svg Icon-->
            </span>`;

var isFocused = true;

// Class Initialization
jQuery(document).ready(function () {
   var login = localStorage.getItem("user");
   if (login === null) {
      window.location.replace("index.html");
   } else {
      window.addEventListener('blur', () => {
         isFocused = false;
      });
      window.addEventListener('focus', () => {
         isFocused = true;
      });


      user = JSON.parse(login);
      console.log(user);
      try {

         document.getElementById("logout").onclick =
            function () {
               localStorage.removeItem('user');
               localStorage.removeItem('permission');
               var data = JSON.stringify({
                  userId: user.data.userId
               });
               $.ajax({
                  type: "Post",
                  url: baseURL + '/User/LogoutUser',
                  headers: {
                     'Content-Type': 'application/json',
                     'userId': user.data.userId,
                     'userToken': user.data.userToken,
                     'userRoleId': user.data.userRoles[0].userRoleId,
                     'branchId': user.data.userRoles[0].branchId,
                     'branchRoleId': user.data.userRoles[0].branchRoleId,
                     'Access-Control-Allow-Origin': '*',
                  },
                  data: data,
                  success: function (response) {
                     console.log(response);
                     if (response.isError == false) {
                        // sessionStorage.setItem('user', JSON.stringify(response));
                        window.location.replace("index.html");
                     } else {
                        Swal.fire({
                           text: response.errorMessage,
                           icon: "error",
                           buttonsStyling: false,
                           confirmButtonText: "Ok, got it!",
                           customClass: {
                              confirmButton: "btn font-weight-bold btn-light-primary"
                           }
                        }).then(function () {
                           KTUtil.scrollTop();
                        });
                     }
                  },
                  error: function (XMLHttpRequest, textStatus, errorThrown) {
                     alert(textStatus);
                  },
               });

            };

      } catch (error) {

      }
      // $.ajaxSetup({
      // 	beforeSend: function (xhr) {
      // 		xhr.setRequestHeader('userId', user.data.userId);
      // 		xhr.setRequestHeader('Accept', 'application/json');
      // 		xhr.setRequestHeader('userToken', user.data.userToken);
      // 		xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
      // 		xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");
      // 		xhr.setRequestHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
      // 		xhr.setRequestHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
      // 	},
      // });
      console.log(user.data.userEmail);
      
   $.ajax({
      type: "Post",
      url: baseURL + '/Inquiry/GetCountByBranchId?branchId=' + user.data.userRoles[0].branchId,
 
      
      headers: {
       'Content-Type': 'application/json',
       'userId': user.data.userId,
       'userToken': user.data.userToken,
       'userRoleId': user.data.userRoles[0].userRoleId,
       'branchId': user.data.userRoles[0].branchId,
       'branchRoleId': user.data.userRoles[0].branchRoleId,
       'Access-Control-Allow-Origin': '*',
   },
      success: function (response) {
       if(document.getElementById("customerCountId")){
          document.getElementById("customerCountId").innerHTML = response.data[0].customers;
       }
       if(document.getElementById("inquiryCountId")){
          document.getElementById("inquiryCountId").innerHTML = response.data[0].inquiriesCount;
       }
       if(document.getElementById("deletedinquiryCountId")){
         document.getElementById("deletedinquiryCountId").innerHTML = response.data[0].deletedInquiries;
      }
       if(document.getElementById("arequestCountId")){
          document.getElementById("arequestCountId").innerHTML = response.data[0].measurementAssinee;
       }
       if(document.getElementById("measurementCountId")){
          document.getElementById("measurementCountId").innerHTML = response.data[0].measurements;
       }
       if(document.getElementById("mapprovalCountId")){
          document.getElementById("mapprovalCountId").innerHTML = response.data[0].measurementApprovals;
       }
       if(document.getElementById("drequestCountId")){
          document.getElementById("drequestCountId").innerHTML = response.data[0].designAssigne;
       }
       if(document.getElementById("designCountId")){
          document.getElementById("designCountId").innerHTML = response.data[0].designs;
       }
       if(document.getElementById("dapprovalCountId")){
          document.getElementById("dapprovalCountId").innerHTML = response.data[0].designApprovals;
          document.getElementById("dapprovalCustomerCountId").innerHTML = response.data[0].designApprovals;
       }
       if(document.getElementById("qrequestCountId")){
          document.getElementById("qrequestCountId").innerHTML = response.data[0].quotationAssign;
       }
       if(document.getElementById("quotationCountId")){
          document.getElementById("quotationCountId").innerHTML = response.data[0].quotations;
       }
       if(document.getElementById("qapprovalCountId")){
          document.getElementById("qapprovalCountId").innerHTML = response.data[0].quotationApprovals;
       }
       if(document.getElementById("filesCountId")){
          document.getElementById("filesCountId").innerHTML = response.data[0].uploadcontract;
       }
       if(document.getElementById("DetailedCountId")){
         document.getElementById("DetailedCountId").innerHTML = response.data[0].detailedFiles;
      }
       if(document.getElementById("technicalCountId")){
          document.getElementById("technicalCountId").innerHTML = response.data[0].technicalChecklist;
       }
       if(document.getElementById("commercialCountId")){
          document.getElementById("commercialCountId").innerHTML = response.data[0].commericalChecklist;
       }
       if(document.getElementById("specialCountId")){
          document.getElementById("specialCountId").innerHTML = response.data[0].specialApprovals;
       }
       if(document.getElementById("auditCountId")){
          document.getElementById("auditCountId").innerHTML = response.data[0].joborderAudit;
       }
       if(document.getElementById("jconfirmCountId")){
          document.getElementById("jconfirmCountId").innerHTML = response.data[0].joborderApprovals;
       }
       if(document.getElementById("jstatusCountId")){
          document.getElementById("jstatusCountId").innerHTML = response.data[0].joborderStatus;
       }
       if(document.getElementById("userCountId")){
          document.getElementById("userCountId").innerHTML = response.data[0].users;
       }
       if(document.getElementById("branchCountId")){
          document.getElementById("branchCountId").innerHTML = response.data[0].branches;
       }
       if(document.getElementById("branchroleCountId")){
          document.getElementById("branchroleCountId").innerHTML = response.data[0].branchroles;
       }
       if(document.getElementById("workscopeCountId")){
          document.getElementById("workscopeCountId").innerHTML = response.data[0].workscopes;
       }
       if(document.getElementById("promoCountId")){
          document.getElementById("promoCountId").innerHTML = response.data[0].promos;
       }
         
 
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
 
      }
   });

      // document.getElementById("userProfileName").value = user.data.userName;
      $("#userProfileName").text(user.data.userName);
      $("#dashboardUserName").text(user.data.userName);
      console.log(user.data.userRoles[0].branchRole);
      $("#branchRoleName").text(user.data.userRoles[0].branchRole.branchRoleName + ' (' + user.data.userRoles[0].branch.branchName + ')');


      $("#userEmail").text(user.data.userEmail);


      const sideMenu = document.getElementById('kt_aside_menu');

      var sideMenuHTML = `	<ul class="menu-nav">
 <li class="menu-item menu-item-active" aria-haspopup="true">
	<a href="home.html" class="menu-link">
		<span class="svg-icon menu-icon svg-icon-light">

		<!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
      <img src="/assets//media/svg/saikitchen/dashboard.svg"/>
		<!--end::Svg Icon-->
		</span>
		<span class="menu-text">Dashboard</span>
	</a>
 </li>
 `;
  sideMenuHTML += `	<ul class="menu-nav">
<li class="menu-item menu-item-active" aria-haspopup="true">
<a href="chat.html" class="menu-link">
 <span class="svg-icon menu-icon svg-icon-light">

 <!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
 <img src="/assets//media/svg/saikitchen/dashboard.svg"/>
 <!--end::Svg Icon-->
 </span>
 <span class="menu-text">Chat</span>
</a>
</li>
`;

      var permission = new Array();

      var userRoleId;

      userRoleId = user.data.userRoles[0].branchRole.roleTypeId;
      var branchTypeId;

      branchTypeId = user.data.userRoles[0].branch.branchTypeId;
      for (var i = 0; i < user.data.userRoles[0].branchRole.permissionRoles.length; i++) {

         var permissions = user.data.userRoles[0].branchRole.permissionRoles[i].permissionId;
         permission.push(permissions);
      }
      // if (permission.includes(5)) {
      // 	alert('Yes');
      // }

      if (permission.includes(5)) {
         sideMenuHTML += `
<li class="menu-section">
<h4 class="menu-text">Customer</h4>
<i class="menu-icon ki ki-bold-more-hor icon-md"></i>
</li>
<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="customer.html?fuserId=`+ user.data.userId +`" class="menu-link menu-toggle">
	<span class="svg-icon menu-icon">
	
   <!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
   <img src="/assets//media/svg/saikitchen/customers.svg"/>
   <!--end::Svg Icon-->
	</span>
	<span class="menu-text">Customer</span>
   <span id="customerCountId" class="badge badge-circle badge-white" style="align-self: center;"></span>
</a>
</li>
<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="gochart.html" class="menu-link menu-toggle">
	<span class="svg-icon menu-icon">
	
   <!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
   <img src="/assets//media/svg/saikitchen/customers.svg"/>
   <!--end::Svg Icon-->
	</span>
	<span class="menu-text">Customer Graph</span>
   <span id="customerCountId" class="badge badge-circle badge-white" style="align-self: center;"></span>
</a>
</li>
`;
      }
      if (permission.includes(6)) {
         sideMenuHTML += `
<li class="menu-section">
<h4 class="menu-text">Inquiry</h4>
<i class="menu-icon ki ki-bold-more-hor icon-md"></i>
</li>
<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="inquiry.html" class="menu-link menu-toggle">
	<span class="svg-icon menu-icon">
	
   <!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
   <img src="/assets//media/svg/saikitchen/inquiry.svg"/>
   <!--end::Svg Icon-->
	</span>
	<span class="menu-text">Inquiry</span>
	<span id="inquiryCountId" class="badge badge-circle badge-white" style="align-self: center;"></span>
</a>
</li>
<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="deletedinquiry.html" class="menu-link menu-toggle">
	<span class="svg-icon menu-icon">
	
   <!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
   <img src="/assets//media/svg/saikitchen/inquiry.svg"/>
   <!--end::Svg Icon-->
	</span>
	<span class="menu-text">Escalated Inquiry</span>
	<span id="deletedinquiryCountId" class="badge badge-circle badge-white" style="align-self: center;"></span>
</a>
</li>
`;
      }
      if (permission.includes(7) || userRoleId == 1 || userRoleId == 3) {
         
   if(branchTypeId!=3){
      sideMenuHTML += `   
<li class="menu-section">
<h4 class="menu-text">Measurement</h4>
<i class="menu-icon ki ki-bold-more-hor icon-md"></i>
</li>`;
   }
if (permission.includes(7)) {
   sideMenuHTML += `
<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
	<a href="measurementassignment.html" class="menu-link menu-toggle">
		<span class="svg-icon menu-icon">
			
      <!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
      <img src="/assets//media/svg/saikitchen/approvalrequest.svg"/>
      <!--end::Svg Icon-->
		</span>
		<span class="menu-text">Assignment Request</span>
		<span id="arequestCountId" class="badge badge-circle badge-white" style="align-self: center;"></span>
	</a>
	</li>
<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="measurement.html" class="menu-link menu-toggle">
	<span class="svg-icon menu-icon">
	
   <!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
   <img src="/assets//media/svg/saikitchen/measurement.svg"/>
   <!--end::Svg Icon-->
	</span>
	<span class="menu-text">Measurement</span>
	<span id="measurementCountId" class="badge badge-circle badge-white" style="align-self: center;"></span>
</a>
</li>
`;
         }
         if(branchTypeId!=3){
         sideMenuHTML += `
	<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
	<a href="measurementrequest.html" class="menu-link menu-toggle">
		<span class="svg-icon menu-icon">
		
      <!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
      <img src="/assets//media/svg/saikitchen/approvalrequest.svg"/>
      <!--end::Svg Icon-->
		</span>
		<span class="menu-text">Approval Request</span>
		<span id="mapprovalCountId" class="badge badge-circle badge-white" style="align-self: center;"></span>
	</a>
	</li>
	`;
}
      }
      if (permission.includes(8) || userRoleId == 1 || userRoleId == 3) {
         if(branchTypeId!=3){
         sideMenuHTML += `
            
<li class="menu-section">
<h4 class="menu-text">Design</h4>
<i class="menu-icon ki ki-bold-more-hor icon-md"></i>
</li>`;
         }
if (permission.includes(8)){
   sideMenuHTML += `   
<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="designassignment.html" class="menu-link menu-toggle">
   <span class="svg-icon menu-icon">
     
   <!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
   <img src="/assets//media/svg/saikitchen/approvalrequest.svg"/>
   <!--end::Svg Icon-->
   </span>
   <span class="menu-text">Assignment Request</span>
   <span id="drequestCountId" class="badge badge-circle badge-white" style="align-self: center;"></span>
</a>
</li>`;


sideMenuHTML += `   
<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="design.html" class="menu-link menu-toggle">
	<span class="svg-icon menu-icon">
	
   <!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
   <img src="/assets//media/svg/saikitchen/design.svg"/>
   <!--end::Svg Icon-->
	</span>
	<span class="menu-text">Design</span>
	<span id="designCountId" class="badge badge-circle badge-white" style="align-self: center;"></span>
</a>
</li>
`;
}

if(branchTypeId!=3){
            sideMenuHTML += `
	<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
	<a href="designrequest.html" class="menu-link menu-toggle">
		<span class="svg-icon menu-icon">
			
      <!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
      <img src="/assets//media/svg/saikitchen/approvalrequest.svg"/>
      <!--end::Svg Icon-->
		</span>
		<span class="menu-text">Approval Request</span>
		<span id="dapprovalCountId" class="badge badge-circle badge-white" style="align-self: center;"></span>
	</a>
	</li>
	`;
   sideMenuHTML += `
	<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
	<a href="designcustomerequest.html" class="menu-link menu-toggle">
		<span class="svg-icon menu-icon">
			
      <!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
      <img src="/assets//media/svg/saikitchen/approvalrequest.svg"/>
      <!--end::Svg Icon-->
		</span>
		<span class="menu-text">Waiting customer Approval</span>
		<span id="dapprovalCustomerCountId" class="badge badge-circle badge-white" style="align-self: center;"></span>
	</a>
	</li>
	`;
}
      }
      if (permission.includes(9)) {
         sideMenuHTML += `
<li class="menu-section">
<h4 class="menu-text">Quotation</h4>
<i class="menu-icon ki ki-bold-more-hor icon-md"></i>
</li>
<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="quotationschedule.html" class="menu-link menu-toggle">
	<span class="svg-icon menu-icon">

   <!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
   <img src="/assets//media/svg/saikitchen/quotation.svg"/>
   <!--end::Svg Icon-->
	</span>
	<span class="menu-text">Assign Schedule</span>
	<span id="qrequestCountId" class="badge badge-circle badge-white" style="align-self: center;"></span>
</a>
</li>
<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="quotation.html" class="menu-link menu-toggle">
	<span class="svg-icon menu-icon">

   <!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
   <img src="/assets//media/svg/saikitchen/quotation.svg"/>
   <!--end::Svg Icon-->
	</span>
	<span class="menu-text">Quotation</span>
	<span id="quotationCountId" class="badge badge-circle badge-white" style="align-self: center;"></span>
</a>
</li>
<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="quotationapprove.html" class="menu-link menu-toggle">
	<span class="svg-icon menu-icon">

   <!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
   <img src="/assets//media/svg/saikitchen/quotation.svg"/>
   <!--end::Svg Icon-->
	</span>
	<span class="menu-text">Approval Quotation</span>
	<span id="qapprovalCountId" class="badge badge-circle badge-white" style="align-self: center;"></span>
</a>
</li>
`;
      }
      if (permission.includes(8)){
         sideMenuHTML += `
<li class="menu-section">
<h4 class="menu-text">JobOrder Files</h4>
<i class="menu-icon ki ki-bold-more-hor icon-md"></i>
</li>

<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="joborderfiles.html" class="menu-link menu-toggle">
	<span class="svg-icon menu-icon">
		
   <!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
   <img src="/assets//media/svg/saikitchen/attach.png"/>
   <!--end::Svg Icon-->
	</span>
	<span class="menu-text">Upload Contract</span>
	<span id="filesCountId" class="badge badge-circle badge-white" style="align-self: center;"></span>
</a>
</li>
<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="detailedfiles.html" class="menu-link menu-toggle">
	<span class="svg-icon menu-icon">
		
   <!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
   <img src="/assets//media/svg/saikitchen/attach.png"/>
   <!--end::Svg Icon-->
	</span>
	<span class="menu-text">Add Detailed Files</span>
	<span id="DetailedCountId" class="badge badge-circle badge-white" style="align-self: center;"></span>
</a>
</li>
`;
      }
      if (permission.includes(13) || permission.includes(17) || permission.includes(21)) {
         sideMenuHTML += `
<li class="menu-section">
<h4 class="menu-text">Checklist</h4>
<i class="menu-icon ki ki-bold-more-hor icon-md"></i>
</li>
`;

if (permission.includes(13)) {
   sideMenuHTML += `
<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="checklist.html" class="menu-link menu-toggle">
	<span class="svg-icon menu-icon">
		
   <!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
   <img src="/assets//media/svg/saikitchen/checklist.svg"/>
   <!--end::Svg Icon-->
	</span>
	<span class="menu-text">Technical Checklist</span>
	<span id="technicalCountId" class="badge badge-circle badge-white" style="align-self: center;"></span>
</a>
</li>`;
      }
if (permission.includes(17)) {
   sideMenuHTML += `
<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="commercialchecklist.html" class="menu-link menu-toggle">
	<span class="svg-icon menu-icon">
		
   <!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
   <img src="/assets//media/svg/saikitchen/checklist.svg"/>
   <!--end::Svg Icon-->
	</span>
	<span class="menu-text">Commercial Checklist</span>
	<span id="commercialCountId" class="badge badge-circle badge-white" style="align-self: center;"></span>
</a>
</li>
`;
      }


      if (permission.includes(21)) {
   sideMenuHTML += `
<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="specialapprove.html" class="menu-link menu-toggle">
<span class="svg-icon menu-icon">
<!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
   <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <rect x="0" y="0" width="24" height="24" />
      <rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
      <path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
   </g>
</svg>
<!--end::Svg Icon-->
</span>
   <span class="menu-text">Special Approval</span>
   <span id="specialCountId" class="badge badge-circle badge-white" style="align-self: center;"></span>
</a>
</li>
`;
      }  
   }

      if (permission.includes(14)||permission.includes(18)) {
         sideMenuHTML += `
<li class="menu-section">
<h4 class="menu-text">Job Order</h4>
<i class="menu-icon ki ki-bold-more-hor icon-md"></i>
</li>
`;
if (permission.includes(18)) {
   sideMenuHTML += `
<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="joborderapproval.html" class="menu-link menu-toggle">
	<span class="svg-icon menu-icon">
		<!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
		<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
			<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
				<rect x="0" y="0" width="24" height="24" />
				<rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
				<path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
			</g>
		</svg>
		<!--end::Svg Icon-->
	</span>
	<span class="menu-text">Job Order Confirmation</span>
	<span id="jconfirmCountId" class="badge badge-circle badge-white" style="align-self: center;"></span>
</a>
</li>`;
}

if (permission.includes(22)) {
sideMenuHTML += `
<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="joborderaudit.html" class="menu-link menu-toggle">
	<span class="svg-icon menu-icon">
		<!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
		<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
			<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
				<rect x="0" y="0" width="24" height="24" />
				<rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
				<path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
			</g>
		</svg>
		<!--end::Svg Icon-->
	</span>
	<span class="menu-text">Job Order Audit</span>
	<span id="auditCountId" class="badge badge-circle badge-white" style="align-self: center;"></span>
</a>
</li>
`;
}
if (permission.includes(14)) {
   sideMenuHTML += `
<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="joborder.html" class="menu-link menu-toggle">
	<span class="svg-icon menu-icon">
		<!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
		<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
			<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
				<rect x="0" y="0" width="24" height="24" />
				<rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
				<path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
			</g>
		</svg>
		<!--end::Svg Icon-->
	</span>
	<span class="menu-text">Job Order Status</span>
	<span id="jstatusCountId" class="badge badge-circle badge-white" style="align-self: center;"></span>
</a>
</li>
`;
        }
        }
        if (permission.includes(14)||permission.includes(18)) {
         sideMenuHTML += `
<li class="menu-section">
<h4 class="menu-text">Factory</h4>
<i class="menu-icon ki ki-bold-more-hor icon-md"></i>
</li>
`;
if (permission.includes(14)) {
   sideMenuHTML += `
<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="commercialproject.html" class="menu-link menu-toggle">
	<span class="svg-icon menu-icon">
		<!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
		<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
			<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
				<rect x="0" y="0" width="24" height="24" />
				<rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
				<path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
			</g>
		</svg>
		<!--end::Svg Icon-->
	</span>
	<span class="menu-text">Commercial Project</span>
	<span id="projectCountId" class="badge badge-circle badge-white" style="align-self: center;"></span>
</a>
</li>`;
}


        }  
      if (permission.includes(15)) {
         sideMenuHTML += `
<li class="menu-section">
<h4 class="menu-text">Payment</h4>
<i class="menu-icon ki ki-bold-more-hor icon-md"></i>
</li>

<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="payment.html" class="menu-link menu-toggle">
	<span class="svg-icon menu-icon">
		<!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
		<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
			<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
				<rect x="0" y="0" width="24" height="24" />
				<rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
				<path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
			</g>
		</svg>
		<!--end::Svg Icon-->
	</span>
	<span class="menu-text">Add Payment</span>
	<span id="paymentCountId" class="badge badge-circle badge-white" style="align-self: center;"></span>
</a>
</li>
`;
      }

      if (permission.includes(16)) {

         sideMenuHTML += `   
        <li class="menu-section">
        <h4 class="menu-text">Reports</h4>
        <i class="menu-icon ki ki-bold-more-hor icon-md"></i>
        </li>
        <li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
        <a href="salesreport.html" class="menu-link menu-toggle">
           <span class="svg-icon menu-icon">
             
           <!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
           <img src="/assets/media/svg/saikitchen/report.svg"/>
           <!--end::Svg Icon-->
           </span>
           <span class="menu-text">Sales Report</span>
           
        </a>
        </li>
        `;
      }

      if (permission.includes(19)) {
         sideMenuHTML += `
<li class="menu-section">
<h4 class="menu-text">Procurement</h4>
<i class="menu-icon ki ki-bold-more-hor icon-md"></i>
</li>
<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="purchase.html" class="menu-link menu-toggle">
<span class="svg-icon menu-icon">
		<!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
		<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
			<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
				<rect x="0" y="0" width="24" height="24" />
				<rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
				<path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
			</g>
		</svg>
		<!--end::Svg Icon-->
	</span>
	<span class="menu-text">Purchase Request</span>
</a>
</li>
<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="purchaseorder.html" class="menu-link menu-toggle">
<span class="svg-icon menu-icon">
<!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
   <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <rect x="0" y="0" width="24" height="24" />
      <rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
      <path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
   </g>
</svg>
<!--end::Svg Icon-->
</span>
	<span class="menu-text">Purchase Order</span>
</a>
</li>

<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="#" class="menu-link menu-toggle">
<span class="svg-icon menu-icon">
<!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
   <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <rect x="0" y="0" width="24" height="24" />
      <rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
      <path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
   </g>
</svg>
<!--end::Svg Icon-->
</span>
	<span class="menu-text">Email Templates</span>
</a>
</li>

<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="#" class="menu-link menu-toggle">
<span class="svg-icon menu-icon">
<!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
   <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <rect x="0" y="0" width="24" height="24" />
      <rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
      <path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
   </g>
</svg>
<!--end::Svg Icon-->
</span>
	<span class="menu-text">Manage Product</span>
</a>
</li>
<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="#" class="menu-link menu-toggle">
<span class="svg-icon menu-icon">
<!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
   <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <rect x="0" y="0" width="24" height="24" />
      <rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
      <path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
   </g>
</svg>
<!--end::Svg Icon-->
</span>
	<span class="menu-text">Manage Product Category</span>
</a>
</li>
<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="UnitOfMeasurement.html" class="menu-link menu-toggle">
<span class="svg-icon menu-icon">
<!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
   <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <rect x="0" y="0" width="24" height="24" />
      <rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
      <path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
   </g>
</svg>
<!--end::Svg Icon-->
</span>
	<span class="menu-text">Manage Unit</span>
</a>
</li>
<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="" class="menu-link menu-toggle">
<span class="svg-icon menu-icon">
<!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
   <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <rect x="0" y="0" width="24" height="24" />
      <rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
      <path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
   </g>
</svg>
<!--end::Svg Icon-->
</span>
	<span class="menu-text">Manage Inventory</span>
</a>
</li>
<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="#" class="menu-link menu-toggle">
<span class="svg-icon menu-icon">
<!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
   <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <rect x="0" y="0" width="24" height="24" />
      <rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
      <path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
   </g>
</svg>
<!--end::Svg Icon-->
</span>
	<span class="menu-text">Manage Suppliers</span>
</a>
</li>

<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="brand.html" class="menu-link menu-toggle">
<span class="svg-icon menu-icon">
<!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
   <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <rect x="0" y="0" width="24" height="24" />
      <rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
      <path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
   </g>
</svg>
<!--end::Svg Icon-->
</span>
	<span class="menu-text">Manage Brand</span>
</a>
</li>


<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="#" class="menu-link menu-toggle">
<span class="svg-icon menu-icon">
<!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
   <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <rect x="0" y="0" width="24" height="24" />
      <rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
      <path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
   </g>
</svg>
<!--end::Svg Icon-->
</span>
	<span class="menu-text">Manage Inventory Location</span>
</a>
</li>

<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="item.html" class="menu-link menu-toggle">
<span class="svg-icon menu-icon">
<!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
   <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <rect x="0" y="0" width="24" height="24" />
      <rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
      <path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
   </g>
</svg>
<!--end::Svg Icon-->
</span>
	<span class="menu-text">Manage Item</span>
</a>
</li>

<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="color.html" class="menu-link menu-toggle">
<span class="svg-icon menu-icon">
<!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
   <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <rect x="0" y="0" width="24" height="24" />
      <rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
      <path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
   </g>
</svg>
<!--end::Svg Icon-->
</span>
	<span class="menu-text">Manage Color</span>
</a>
</li>
<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="material.html" class="menu-link menu-toggle">
<span class="svg-icon menu-icon">
<!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
   <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <rect x="0" y="0" width="24" height="24" />
      <rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
      <path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
   </g>
</svg>
<!--end::Svg Icon-->
</span>
	<span class="menu-text">Manage Materials</span>
</a>
</li>
<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="size.html" class="menu-link menu-toggle">
<span class="svg-icon menu-icon">
<!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
   <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <rect x="0" y="0" width="24" height="24" />
      <rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
      <path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
   </g>
</svg>
<!--end::Svg Icon-->
</span>
	<span class="menu-text">Manage Size</span>
</a>
</li>
`;
      }
      if (permission.includes(19)) {
         sideMenuHTML += `
<li class="menu-section">
<h4 class="menu-text">Promotion</h4>
<i class="menu-icon ki ki-bold-more-hor icon-md"></i>
</li>
<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="promotiontemplate.html" class="menu-link menu-toggle">
<span class="svg-icon menu-icon">
		<!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
		<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
			<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
				<rect x="0" y="0" width="24" height="24" />
				<rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
				<path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
			</g>
		</svg>
		<!--end::Svg Icon-->
	</span>
	<span class="menu-text">Promotion Tamplate</span>
</a>
</li>
<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="#" class="menu-link menu-toggle">
<span class="svg-icon menu-icon">
<!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
   <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <rect x="0" y="0" width="24" height="24" />
      <rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
      <path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
   </g>
</svg>
<!--end::Svg Icon-->
</span>
	<span class="menu-text">Promotion Schedule</span>
</a>
</li>

`;
      }
      if (permission.includes(23)) {
      sideMenuHTML += `
		<li class="menu-section">
		<h4 class="menu-text">Marketing</h4>
		<i class="menu-icon ki ki-bold-more-hor icon-md"></i>
		</li>`;
      sideMenuHTML += `
      <li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
         <a href="newsletter.html" class="menu-link menu-toggle">
            <span class="svg-icon menu-icon">
            
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
               <rect x="0" y="0" width="24" height="24" />
               <rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
               <path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
            </g>
         </svg>
            </span>
            <span class="menu-text">NewsLetter Templates</span>
             </a>
      </li>
      `;
      }
      if (permission.includes(2) || permission.includes(3) || permission.includes(4)) {
         sideMenuHTML += `
		<li class="menu-section">
		<h4 class="menu-text">CRM Management</h4>
		<i class="menu-icon ki ki-bold-more-hor icon-md"></i>
		</li>`;

      }

      if (permission.includes(4)) {
         sideMenuHTML += `
	<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
		<a href="user.html" class="menu-link menu-toggle">
			<span class="svg-icon menu-icon">
			
         <!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
         <img src="/assets//media/svg/saikitchen/users.svg"/>
         <!--end::Svg Icon-->
			</span>
			<span class="menu-text">User</span>
         <span id="userCountId" class="badge badge-circle badge-white" style="align-self: center;"></span>
		</a>
	</li>
	`;
      }
      if (permission.includes(2)) {
         sideMenuHTML += `<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
		<a href="branch.html" class="menu-link menu-toggle">
			<span class="svg-icon menu-icon">
				
         <!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
         <img src="/assets//media/svg/saikitchen/branch.svg"/>
         <!--end::Svg Icon-->
			</span>
			<span class="menu-text">Branch</span>
         <span id="branchCountId" class="badge badge-circle badge-white" style="align-self: center;"></span>
		</a>
	</li>`;
      }
      if (permission.includes(3)) {
         sideMenuHTML += `
		<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
			<a href="branchrole.html" class="menu-link menu-toggle">
				<span class="svg-icon menu-icon">
					
            <!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
            <img src="/assets//media/svg/saikitchen/branchrole.svg"/>
            <!--end::Svg Icon-->
				</span>
				<span class="menu-text">Branch Role</span>
            <span id="branchroleCountId" class="badge badge-circle badge-white" style="align-self: center;"></span>
			</a>
		</li>`;
      }
      if (permission.includes(3)) {
         sideMenuHTML += `
		<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
			<a href="setting.html" class="menu-link menu-toggle">
				<span class="svg-icon menu-icon">
					
            <!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
            <img src="/assets/media/svg/saikitchen/setting.svg"/>
            <!--end::Svg Icon-->
				</span>
				<span class="menu-text">Setting</span>
			</a>
		</li>`;
      }

      if (permission.includes(10) || permission.includes(11) || permission.includes(12)) {
         sideMenuHTML += `
		<li class="menu-section">
		<h4 class="menu-text">Settings</h4>
		<i class="menu-icon ki ki-bold-more-hor icon-md"></i>
		</li>`;

      }
      if (permission.includes(10)) {
         sideMenuHTML += `
		<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
			<a href="workscope.html" class="menu-link menu-toggle">
				<span class="svg-icon menu-icon">
					
            <!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
            <img src="/assets//media/svg/saikitchen/workscope.svg"/>
            <!--end::Svg Icon-->
				</span>
				<span class="menu-text">WorkScope</span>
            <span id="workscopeCountId" class="badge badge-circle badge-white" style="align-self: center;"></span>
			</a>
		</li>`;
      }
      if (permission.includes(11)) {
         sideMenuHTML += `
		<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
			<a href="fees.html" class="menu-link menu-toggle">
				<span class="svg-icon menu-icon">
					<!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
					<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
						<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<rect x="0" y="0" width="24" height="24" />
							<rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
							<path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
						</g>
					</svg>
					<!--end::Svg Icon-->
				</span>
				<span class="menu-text">Fees</span>
			</a>
		</li>`;


      
      }
      if (permission.includes(12)) {
         sideMenuHTML += `
		<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
			<a href="promo.html" class="menu-link menu-toggle">
				<span class="svg-icon menu-icon">
					<!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
					<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
						<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<rect x="0" y="0" width="24" height="24" />
							<rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
							<path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
						</g>
					</svg>
					<!--end::Svg Icon-->
				</span>
				<span class="menu-text">Promo</span>
            <span id="promoCountId" class="badge badge-circle badge-white" style="align-self: center;"></span>
			</a>
		</li>
		
      </ul>`;
       }
      // if (permission.includes(12)) {
      //    sideMenuHTML += `
		// <li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
		// 	<a href="brand.html" class="menu-link menu-toggle">
		// 		<span class="svg-icon menu-icon">
		// 			<!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
		// 			<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
		// 				<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
		// 					<rect x="0" y="0" width="24" height="24" />
		// 					<rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
		// 					<path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
		// 				</g>
		// 			</svg>
		// 			<!--end::Svg Icon-->
		// 		</span>
		// 		<span class="menu-text">Brand</span>
      //       <span id="brandCountId" class="badge badge-circle badge-white" style="align-self: center;"></span>
		// 	</a>
		// </li>`;
      // }
      // if (permission.includes(12)) {
      //    sideMenuHTML += `
		// <li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
		// 	<a href="UnitOfMeasurement.html" class="menu-link menu-toggle">
		// 		<span class="svg-icon menu-icon">
		// 			<!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
		// 			<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
		// 				<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
		// 					<rect x="0" y="0" width="24" height="24" />
		// 					<rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
		// 					<path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
		// 				</g>
		// 			</svg>
		// 			<!--end::Svg Icon-->
		// 		</span>
		// 		<span class="menu-text">Unit Of Measurement</span>
      //       <span id="" class="badge badge-circle badge-white" style="align-self: center;"></span>
		// 	</a>
		// </li>
		
		// </ul>`;
      // }

      sideMenu.innerHTML = sideMenuHTML;



   }
   getNotifications();

   setInterval(getNotifications, 10000); //10000 milliseconds = 10 seconds
   document.addEventListener('contextmenu', event => event.preventDefault());
});



function getNotifications() {
   if (isFocused) {
      $.ajax({
         type: "Post",
         url: baseURL + '/Notification/GeAllNotificationofUser?userId=' + user.data.userId,

         headers: {
            'Content-Type': 'application/json',
            'userId': user.data.userId,
            'userToken': user.data.userToken,
            'userRoleId': user.data.userRoles[0].userRoleId,
            'branchId': user.data.userRoles[0].branchId,
            'branchRoleId': user.data.userRoles[0].branchRoleId,
            'Access-Control-Allow-Origin': '*',
         },
         success: function (response) {
            console.log(response);
            if (response.isError == false) {
               var notification = document.getElementById('notification');
               var notificationInquiry = document.getElementById('notificationinquiry');
               var notificationMeasurement = document.getElementById('notificationmeasurement');
               var notificationDesign = document.getElementById('notificatiodesign');
               notification.innerHTML = ``;
               notificationMeasurement.innerHTML = ``;
               notificationinquiry.innerHTML = ``;
               notificationDesign.innerHTML = ``;
               for (var i = 0; i < response.data.length; i++) {
                  notification.innerHTML += `<div class="d-flex align-items-center mb-6"  onclick="location.href='` + response.data[i].notificationCategoryName + `.html';" style="cursor: pointer;">
				<!--begin::Symbol-->
				<div class="symbol symbol-40 symbol-light-primary mr-5">
					<span class="symbol-label">
						<span class="svg-icon svg-icon-lg svg-icon-primary">
							<!--begin::Svg Icon | path:assets/media/svg/icons/Home/Library.svg-->
							<svg xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
								width="24px" height="24px" viewBox="0 0 24 24"
								version="1.1">
								<g stroke="none" stroke-width="1" fill="none"
									fill-rule="evenodd">
									<rect x="0" y="0" width="24" height="24" />
									<path
										d="M5,3 L6,3 C6.55228475,3 7,3.44771525 7,4 L7,20 C7,20.5522847 6.55228475,21 6,21 L5,21 C4.44771525,21 4,20.5522847 4,20 L4,4 C4,3.44771525 4.44771525,3 5,3 Z M10,3 L11,3 C11.5522847,3 12,3.44771525 12,4 L12,20 C12,20.5522847 11.5522847,21 11,21 L10,21 C9.44771525,21 9,20.5522847 9,20 L9,4 C9,3.44771525 9.44771525,3 10,3 Z"
										fill="#000000" />
									<rect fill="#000000" opacity="0.3"
										transform="translate(17.825568, 11.945519) rotate(-19.000000) translate(-17.825568, -11.945519)"
										x="16.3255682" y="2.94551858" width="3"
										height="18" rx="1" />
								</g>
							</svg>
							<!--end::Svg Icon-->
						</span>
					</span>
				</div>
				<!--end::Symbol-->
				<!--begin::Text-->
				<div class="d-flex flex-column font-weight-bold">
				<div class="font-weight-bold">` + response.data[i].notificationContent + `</div>
					<span class="text-muted">` + response.data[i].notificationCategoryName + `</span>
				</div>
				<!--end::Text-->
			</div>`;


                  if (response.data[i].notificationCategoryName == "Inquiry") {
                     notificationInquiry.innerHTML += `
						<div class="d-flex align-items-center mb-6"   onclick="location.href='` + response.data[i].notificationCategoryName + `.html';" style="cursor: pointer;">
						<!--begin::Symbol-->
						<div class="symbol symbol-40 symbol-light-primary mr-5">
							<span class="symbol-label">
								<span class="svg-icon svg-icon-lg svg-icon-primary">
									<!--begin::Svg Icon | path:assets/media/svg/icons/Home/Library.svg-->
									<svg xmlns="http://www.w3.org/2000/svg"
										xmlns:xlink="http://www.w3.org/1999/xlink"
										width="24px" height="24px" viewBox="0 0 24 24"
										version="1.1">
										<g stroke="none" stroke-width="1" fill="none"
											fill-rule="evenodd">
											<rect x="0" y="0" width="24" height="24" />
											<path
												d="M5,3 L6,3 C6.55228475,3 7,3.44771525 7,4 L7,20 C7,20.5522847 6.55228475,21 6,21 L5,21 C4.44771525,21 4,20.5522847 4,20 L4,4 C4,3.44771525 4.44771525,3 5,3 Z M10,3 L11,3 C11.5522847,3 12,3.44771525 12,4 L12,20 C12,20.5522847 11.5522847,21 11,21 L10,21 C9.44771525,21 9,20.5522847 9,20 L9,4 C9,3.44771525 9.44771525,3 10,3 Z"
												fill="#000000" />
											<rect fill="#000000" opacity="0.3"
												transform="translate(17.825568, 11.945519) rotate(-19.000000) translate(-17.825568, -11.945519)"
												x="16.3255682" y="2.94551858" width="3"
												height="18" rx="1" />
										</g>
									</svg>
									<!--end::Svg Icon-->
								</span>
							</span>
						</div>
						<!--end::Symbol-->
						<!--begin::Text-->
						<div class="d-flex flex-column font-weight-bold">
						<div class="font-weight-bold">` + response.data[i].notificationContent + `</div>
							
								<div class="text-muted">3 days ago</div>
						</div>
						<!--end::Text-->
					</div>`;
                  }
                  if (response.data[i].notificationCategoryName == "Measurement") {
                     notificationMeasurement.innerHTML += `
						<div class="d-flex align-items-center mb-6"  onclick="location.href='` + response.data[i].notificationCategoryName + `.html';" style="cursor: pointer;">
						<!--begin::Symbol-->
						<div class="symbol symbol-40 symbol-light-primary mr-5">
							<span class="symbol-label">
								<span class="svg-icon svg-icon-lg svg-icon-primary">
									<!--begin::Svg Icon | path:assets/media/svg/icons/Home/Library.svg-->
									<svg xmlns="http://www.w3.org/2000/svg"
										xmlns:xlink="http://www.w3.org/1999/xlink"
										width="24px" height="24px" viewBox="0 0 24 24"
										version="1.1">
										<g stroke="none" stroke-width="1" fill="none"
											fill-rule="evenodd">
											<rect x="0" y="0" width="24" height="24" />
											<path
												d="M5,3 L6,3 C6.55228475,3 7,3.44771525 7,4 L7,20 C7,20.5522847 6.55228475,21 6,21 L5,21 C4.44771525,21 4,20.5522847 4,20 L4,4 C4,3.44771525 4.44771525,3 5,3 Z M10,3 L11,3 C11.5522847,3 12,3.44771525 12,4 L12,20 C12,20.5522847 11.5522847,21 11,21 L10,21 C9.44771525,21 9,20.5522847 9,20 L9,4 C9,3.44771525 9.44771525,3 10,3 Z"
												fill="#000000" />
											<rect fill="#000000" opacity="0.3"
												transform="translate(17.825568, 11.945519) rotate(-19.000000) translate(-17.825568, -11.945519)"
												x="16.3255682" y="2.94551858" width="3"
												height="18" rx="1" />
										</g>
									</svg>
									<!--end::Svg Icon-->
								</span>
							</span>
						</div>
						<!--end::Symbol-->
						<!--begin::Text-->
						<div class="d-flex flex-column font-weight-bold">
						<div class="font-weight-bold">` + response.data[i].notificationContent + `</div>
							
								<div class="text-muted">` + response.data[i].createdDate + `</div>
						</div>
						<!--end::Text-->
					</div>`;
                  }
                  if (response.data[i].notificationCategoryName == "Design") {
                     notificationDesign.innerHTML += `
						<div class="d-flex align-items-center mb-6"   onclick="location.href='` + response.data[i].notificationCategoryName + `.html';" style="cursor: pointer;">
						<!--begin::Symbol-->
						<div class="symbol symbol-40 symbol-light-primary mr-5">
							<span class="symbol-label">
								<span class="svg-icon svg-icon-lg svg-icon-primary">
									<!--begin::Svg Icon | path:assets/media/svg/icons/Home/Library.svg-->
									<svg xmlns="http://www.w3.org/2000/svg"
										xmlns:xlink="http://www.w3.org/1999/xlink"
										width="24px" height="24px" viewBox="0 0 24 24"
										version="1.1">
										<g stroke="none" stroke-width="1" fill="none"
											fill-rule="evenodd">
											<rect x="0" y="0" width="24" height="24" />
											<path
												d="M5,3 L6,3 C6.55228475,3 7,3.44771525 7,4 L7,20 C7,20.5522847 6.55228475,21 6,21 L5,21 C4.44771525,21 4,20.5522847 4,20 L4,4 C4,3.44771525 4.44771525,3 5,3 Z M10,3 L11,3 C11.5522847,3 12,3.44771525 12,4 L12,20 C12,20.5522847 11.5522847,21 11,21 L10,21 C9.44771525,21 9,20.5522847 9,20 L9,4 C9,3.44771525 9.44771525,3 10,3 Z"
												fill="#000000" />
											<rect fill="#000000" opacity="0.3"
												transform="translate(17.825568, 11.945519) rotate(-19.000000) translate(-17.825568, -11.945519)"
												x="16.3255682" y="2.94551858" width="3"
												height="18" rx="1" />
										</g>
									</svg>
									<!--end::Svg Icon-->
								</span>
							</span>
						</div>
						<!--end::Symbol-->
						<!--begin::Text-->
						<div class="d-flex flex-column font-weight-bold">
						<div class="font-weight-bold">` + response.data[i].notificationContent + `</div>
							
								<div class="text-muted">` + response.data[i].createdDate + `</div>
						</div>
						<!--end::Text-->
					</div>`;
                  }
               }
            } else {
               Swal.fire({
                  text: response.errorMessage,
                  icon: "error",
                  buttonsStyling: false,
                  confirmButtonText: "Ok, got it!",
                  customClass: {
                     confirmButton: "btn font-weight-bold btn-light-primary"
                  }
               }).then(function () {
                  KTUtil.scrollTop();
               });
            }
         },
         error: function (XMLHttpRequest, textStatus, errorThrown) {
            // alert(textStatus);
         },
      });
   }

}
