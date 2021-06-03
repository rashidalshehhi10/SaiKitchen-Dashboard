"use strict";

import {
    baseURL
} from './constant.js';

let branchRoles=new Array();


// Class definition
var KTTagifyDemos = function () {
    var demo1 = function () {
        // Init autocompletes
        var toEl = document.getElementById('kt_tagify_1');
        var tagifyTo = new Tagify(toEl, {
            delimiters: ", ", // add new tags when a comma or a space character is entered
            maxTags: 500,
            // blacklist: ["fuck"],
            keepInvalidTags: false, // do not remove invalid tags (but keep them marked as invalid)
            whitelist: branchRoles,
            templates: {
                dropdownItem: function (tagData) {
                    try {
                        var html = '';
                        html += '<div class="tagify__dropdown__item">';
                        html += '   <div class="d-flex align-items-center">';
                        html += '       <span class="symbol sumbol-' + (tagData.initialsState ? tagData.initialsState : '') + ' mr-2">';
                        html += '           <span class="symbol-label" style="background-image: url(\'' + (tagData.pic ? tagData.pic : '') + '\')">' + (tagData.initials ? tagData.initials : '') + '</span>';
                        html += '       </span>';
                        html += '       <div class="d-flex flex-column">';
                        html += '           <a href="#" class="text-dark-75 text-hover-primary font-weight-bold">' + (tagData.value ? tagData.value : '') + '</a>';
                        html += '           <span class="text-muted font-weight-bold">' + (tagData.subTtext ? tagData.subTtext : '') + '</span>';
                        html += '       </div>';
                        html += '   </div>';
                        html += '</div>';

                        return html;
                    } catch (err) {}
                }
            },
            transformTag: function (tagData) {
                tagData.class = 'tagify__tag tagify__tag--primary';
            },
            dropdown: {
                classname: "color-blue",
                enabled: 1,
                maxItems: 5
            }
        });
        
        var toE2 = document.getElementById('kt_tagify_2');
        var tagifyTo = new Tagify(toE2, {
            delimiters: ", ", // add new tags when a comma or a space character is entered
            maxTags: 500,
            // blacklist: ["fuck"],
            keepInvalidTags: false, // do not remove invalid tags (but keep them marked as invalid)
            whitelist: branchRoles,
            templates: {
                dropdownItem: function (tagData) {
                    try {
                        var html = '';
                        html += '<div class="tagify__dropdown__item">';
                        html += '   <div class="d-flex align-items-center">';
                        html += '       <span class="symbol sumbol-' + (tagData.initialsState ? tagData.initialsState : '') + ' mr-2">';
                        html += '           <span class="symbol-label" style="background-image: url(\'' + (tagData.pic ? tagData.pic : '') + '\')">' + (tagData.initials ? tagData.initials : '') + '</span>';
                        html += '       </span>';
                        html += '       <div class="d-flex flex-column">';
                        html += '           <a href="#" class="text-dark-75 text-hover-primary font-weight-bold">' + (tagData.value ? tagData.value : '') + '</a>';
                        html += '           <span class="text-muted font-weight-bold">' + (tagData.subTtext ? tagData.subTtext : '') + '</span>';
                        html += '       </div>';
                        html += '   </div>';
                        html += '</div>';

                        return html;
                    } catch (err) {}
                }
            },
            transformTag: function (tagData) {
                tagData.class = 'tagify__tag tagify__tag--primary';
            },
            dropdown: {
                classname: "color-blue",
                enabled: 1,
                maxItems: 5
            }
        });
    }


    return {
        // public functions
        init: function () {
            demo1();
        }
    };
}();

jQuery(document).ready(function () {


    console.log(baseURL + '/Branch/GetBranchRoles');

    $.ajax({
        type: "get",
        url: baseURL + '/Branch/GetBranchRoles',

        success: function (response) {
            console.log(response);
            if (response.isError == false) {
                console.log(response.data[0].branchRoleName);
                // branchRoles = response.data;
                
                response.data.forEach(element => {
                    
                console.log(element.branchRoleName);
                var tagVal = {
                    value: '',
                    subTtext: '',
                    initials: '',
                    branchRoleId: '',
                    initialsState: 'warning',
                    pic: ''
                };
                tagVal.value=element.branchRoleName;
                tagVal.subTtext=element.branchRoleDescription;
                tagVal.branchRoleId=element.branchRoleId;
                tagVal.initials=element.branchRoleName.charAt(0);
                    branchRoles.push(tagVal);
                });
                
            }
            
    KTTagifyDemos.init();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // alert(errorThrown);
            
	 Swal.fire({
		text: 'Internet Connection Problem',
		icon: "error",
		buttonsStyling: false,
		confirmButtonText: "Ok, got it!",
		customClass: {
			confirmButton: "btn font-weight-bold btn-light-primary"
		}
	}).then(function() {
		KTUtil.scrollTop();
	});
            
    KTTagifyDemos.init();
        }
    });


});