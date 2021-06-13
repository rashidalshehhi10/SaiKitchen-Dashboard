"use strict";

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
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
// var script = document.createElement('script');
// script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
// script.type = 'text/javascript';
// document.getElementsByTagName('head')[0].appendChild(script);




// Class Initialization
jQuery(document).ready(function() {
    var login = localStorage.getItem("user");
    if (login === null) {
        window.location.replace("index.html");
    } else {




        user = JSON.parse(login);
        console.log(user);
        try {

            document.getElementById("logout").onclick =
                function() {
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
                        },
                        data: data,
                        success: function(response) {
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
                                }).then(function() {
                                    KTUtil.scrollTop();
                                });
                            }
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
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
`;

        var permission = new Array();


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
<a href="customer.html" class="menu-link menu-toggle">
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
	<span class="menu-text">Customer</span>
	
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
		<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
			<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
				<rect x="0" y="0" width="24" height="24" />
				<rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
				<path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
			</g>
		</svg>
		<!--end::Svg Icon-->
	</span>
	<span class="menu-text">Inquiry</span>
	
</a>
</li>
`;
        }
        if (permission.includes(7)) {
            sideMenuHTML += `
<li class="menu-section">
<h4 class="menu-text">Measurement</h4>
<i class="menu-icon ki ki-bold-more-hor icon-md"></i>
</li>

<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="measurement.html" class="menu-link menu-toggle">
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
	<span class="menu-text">Measurement</span>
	
</a>
</li>
`;
if(user.data.userRoles[0].branchRole.roleTypeId==1||user.data.userRoles[0].branchRole.roleTypeId==3){
	sideMenuHTML += `
	<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
	<a href="measurementrequest.html" class="menu-link menu-toggle">
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
		<span class="menu-text">Approval Request</span>
		
	</a>
	</li>
	`;
}
        }
        if (permission.includes(8)) {
            sideMenuHTML += `
<li class="menu-section">
<h4 class="menu-text">Design</h4>
<i class="menu-icon ki ki-bold-more-hor icon-md"></i>
</li>

<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="design.html" class="menu-link menu-toggle">
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
	<span class="menu-text">Design</span>
	
</a>
</li>
`;
        }
        if (permission.includes(9)) {
            sideMenuHTML += `
<li class="menu-section">
<h4 class="menu-text">Quotation</h4>
<i class="menu-icon ki ki-bold-more-hor icon-md"></i>
</li>

<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
<a href="quotation.html" class="menu-link menu-toggle">
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
	<span class="menu-text">Quotation</span>
	
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
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
					<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
						<rect x="0" y="0" width="24" height="24" />
						<rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
						<path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
					</g>
				</svg>
				<!--end::Svg Icon-->
			</span>
			<span class="menu-text">User</span>
		</a>
	</li>
	`;
        }
        if (permission.includes(2)) {
            sideMenuHTML += `<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
		<a href="branch.html" class="menu-link menu-toggle">
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
			<span class="menu-text">Branch</span>
		</a>
	</li>`;
        }
        if (permission.includes(3)) {
            sideMenuHTML += `
		<li class="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
			<a href="branchrole.html" class="menu-link menu-toggle">
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
				<span class="menu-text">Branch Role</span>
			</a>
		</li>`;
        }


        if (permission.includes(10)) {
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
					<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
						<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<rect x="0" y="0" width="24" height="24" />
							<rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
							<path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
						</g>
					</svg>
					<!--end::Svg Icon-->
				</span>
				<span class="menu-text">WorkScope</span>
			</a>
		</li>
		
		</ul>`;
        }


        sideMenu.innerHTML = sideMenuHTML;



    }
    getNotifications();

    setInterval(getNotifications, 5000); //10000 milliseconds = 10 seconds
});



function getNotifications() {

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
        },
        success: function(response) {
            console.log(response);
            if (response.isError == false) {
                var notification = document.getElementById('notification');
                var notificationInquiry = document.getElementById('notificationinquiry');
                var notificationMeasurement = document.getElementById('notificationmeasurement');
                notification.innerHTML = ``;
                notificationMeasurement.innerHTML = ``;
                notificationinquiry.innerHTML = ``;
                for (var i = 0; i < response.data.length; i++) {
                    notification.innerHTML += `<div class="d-flex align-items-center mb-6">
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
						<div class="font-weight-bold">` + response.data[i].notificationContent + `</div>
							
								<div class="text-muted">3 days ago</div>
						</div>
						<!--end::Text-->
					</div>`;
                    }
                    if (response.data[i].notificationCategoryName == "Measurement") {
                        notificationMeasurement.innerHTML += `
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
						<div class="font-weight-bold">` + response.data[i].notificationContent + `</div>
							
								<div class="text-muted">3 days ago</div>
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
                }).then(function() {
                    KTUtil.scrollTop();
                });
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            // alert(textStatus);
        },
    });
}