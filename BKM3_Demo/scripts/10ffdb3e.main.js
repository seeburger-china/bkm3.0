'use strict';
$(function() {
    //siderbar border
    $('.has-sidebar .main').css('min-height', function() {
        return ($(window).height() - 145) + 'px';
    });
    //tooltip
    $('[data-toggle="tooltip"]').tooltip({
        container: 'body'
    });
    //toggle filter
    $('#toggleFilter').click(function() {
        //Update wangjin 20150611
        $(this).find('i').toggleClass('fa-angle-down');
        $('.folding-panel').slideToggle();
    });

    //updated wangjin 20150609
    $('.btn-toggleFilterApply').click(function() {
        $('.folding-panel').slideToggle();
        $("#toggleFilter").find('i').toggleClass('fa-angle-down');

        $('#tagsinput').tagsinput('removeAll');

        $(".filter-section input").each(function() {
            if (this.tagName === 'SELECT') {
                //single select
                 var label = $(this).data('label');
                 var value = $(this).val();
                $('#tagsinput').tagsinput('add', label + ':' + value);
                //radio & checkbox
            }
            else if($(this).is('[type="text"]')) {
                var label = $(this).data('label');
                var value = $(this).val();
                 if (value){
                $('#tagsinput').tagsinput('add', label + ':' + value);
                }
            }
            else if ($(this).is('[type="radio"]')) {
                    $(this).each(function() {
                        if ($(this).is(":checked")) {
                            var label = $(this).data('label');
                            var value = $(this).val();
                            $('#tagsinput').tagsinput('add', label + ':' + value);
                        }
                    });
             } else if ($(this).is('[type="checkbox"]')) {
                    $(this).each(function() {
                        if ($(this).is(":checked")) {
                            var label = $(this).data('label');
                            var oldval = $(this).parent().siblings('.title').attr('data-value');
                            var arr = [];
                            $('[data-label="' + label + '"]:checked').each(function() {
                                arr.push($(this).val());
                            });
                            var value = arr.join(' ');
                            //store the value somewhere
                            if (value) {
                                $('#tagsinput').tagsinput('add', label + ':' + value);
                            }
                        }
                    });
                }


                $(".bootstrap-tagsinput .tag span").each(function() {
                        $(this).attr('data-role',' ');

                        });
        });

    });

    /*******filter tagsinput Start*********/
    $('#tagsinput').tagsinput({
        allDuplicates: false,
        itemValue: 'value',
        itemText: 'value'
    });
    //reset checkbox and radio when delete a tag
    $('#tagsinput').on('itemRemoved', function(e) {
        var label = e.item.split(':')[0];
        var value = e.item.split(':')[1];
        var $controls = $('[data-label="' + label + '"]');
        $controls.each(function() {
            if (this.tagName === 'SELECT') {
                //single select
                $(this).selectpicker('val', 'All');
                //radio & checkbox
            } else {
                if ($(this).is('[type="radio"]')) {
                    $(this).each(function() {
                        if ($(this).val() === value) {
                            $(this).prop('checked', false);
                        }
                    });
                } else {
                    if (value === $(this).parent().siblings('.title').attr('data-value')) {
                        $('[data-label="' + label + '"]:checked').each(function() {
                            $(this).prop('checked', false);
                        });
                    }
                }
            }
        });
    });


    /*
    $('.filter-item input[type="radio"],.filter-item select:not([multiple])').change(function() {
        var label = $(this).data('label');
        var value = $(this).val();
        $.each($('#tagsinput').tagsinput('items'), function(i, v) {
            if (v.split(':')[0] === label) {
                $('#tagsinput').tagsinput('remove', v);
                return false;
            }
        });
        $('#tagsinput').tagsinput('add', label + ':' + value);
    });
    $('.filter-item input[type="checkbox"]').change(function() {
        var label = $(this).data('label');
        var oldval = $(this).parent().siblings('.title').attr('data-value');
        var arr = [];
        $('[data-label="' + label + '"]:checked').each(function() {
            arr.push($(this).val());
        });
        var value = arr.join(' ');
        //store the value somewhere
        $(this).parent().siblings('.title').attr('data-value', value);
        $('#tagsinput').tagsinput('remove', label + ':' + oldval);
        if (value) {
            $('#tagsinput').tagsinput('add', label + ':' + value);
        }
    });
    $('#filter-datetimepicker-from,#filter-datetimepicker-to').datetimepicker({
        format: 'YYYY-MM-DD',
        icons: {
            time: 'fa fa-clock-o',
            date: 'fa fa-calendar',
            up: 'fa fa-arrow-up',
            down: 'fa fa-arrow-down'
        }
    });
*/
    /*******filter tagsinput End*********/
    //toggle checkbox
    $('.bka-table').find('thead>tr>th:first-child').hide();
    $('.bka-table').find('tbody>tr>td:first-child').hide();
    $('#selectToggle').click(function() {
        $(this).toggleClass('active');
        var bkaTab = $('#bka-tab');
        var companiesTab = $('#companies-tab');
        if (bkaTab.hasClass('active')) {
            $('.bka-table').find('thead>tr>th:first-child').toggle();
            $('.bka-table').find('tbody>tr>td:first-child').toggle();
        } else if (companiesTab.hasClass('active')) {
            var ulSupp = $('.ul_supp');
            if (ulSupp.hasClass('is-select')) {
                ulSupp.removeClass('is-select');
            } else {
                ulSupp.addClass('is-select');
            }
        }
    });
    //Choose plant or car model
    $('#s-plant').change(function() {
         var $plants = $('[data-type="plant"]');
         if ($(this).is(":checked")) {
                    $plants.show();
                } else {
                    $plants.hide();
                    var $carmodels = $('[data-type="car"]');
                    $carmodels.hide();
                    $('#s-carmodel').removeAttr('checked');
                }
    });
    $('#s-carmodel').change(function() {
        var $carmodels = $('[data-type="car"]');
        if ($(this).is(":checked")) {
                    $carmodels.show();
                } else {
                    $carmodels.hide();
                }
    });

    //trigger parts modal
    $('.option-panel .parts-list li a').not('.child').click(function() {
        $('#parts-info-modal').modal('show');
    });

    //
    $('.requestUpdate a').not('.child').click(function() {
        $('#parts-info-modal').modal('show');
    });

    //foldable labels
    $('#toggle-other-demand').click(function() {
        $(this).find('i').toggleClass('fa-rotate-90');
        $(this).siblings('ul').toggle();
        $('[data-type="other-demand"]').toggle();
    });
    $('#toggle-flexibility').click(function() {
        $(this).find('i').toggleClass('fa-rotate-90');
        $(this).siblings('ul').toggle();
        $('[data-type="flexibility"]').toggle();
    });
    $('#toggle-flexibility1').click(function() {
        $(this).find('i').toggleClass('fa-rotate-90');
        $(this).siblings('ul').toggle();
        $('[data-type="flexibility1"]').toggle();
    });
    $('#toggle-capacity').click(function() {
        $(this).find('i').toggleClass('fa-rotate-90');
        $(this).siblings('ul').toggle();
        $('[data-type="capacity"]').toggle();
    });
	//Updates By HouYanqiu
	$('#toggle-capacity1').click(function() {
        $(this).find('i').toggleClass('fa-rotate-90');
        $(this).siblings('ul').toggle();
        $('[data-type="capacity1"]').toggle();
    });
    //wizard
    var $wizard = $('#wizard-tab');
    var currentTab = 0;
    $('#next-step').click(function() {
	    if (currentTab === 1) {
            $("#inventory-step").show();
        } else {
			$("#inventory-step").hide();
		}

        if (currentTab === 3) {
            $("#next-step").prop('href', "bkaview.html");
            return;
        }

        currentTab++;
        //Update By Wangjin 20150612
        if (currentTab === 3) {
            $("#next-step").html("Submit");

        }
        else
        {
            $("#next-step").html("Next");
            $("#next-step").prop('href', "javascript:void(0);");
			//Update By HouYanqiu 20170630
			if (currentTab === 1) {
				$("#inventory-step").show();
			} else {
				$("#inventory-step").hide();
			}
        }
        if(currentTab >=1){
            $("#pre-step").html("Back");
			//Update By HouYanqiu 20170630
			if (currentTab === 1) {
				$("#inventory-step").show();
			} else {
				$("#inventory-step").hide();
			}
        }


        $wizard.find('a:lt(' + currentTab + ')').parent().addClass('complete');
        $wizard.find('a:eq(' + currentTab + ')').tab('show');
        resetTab();
    });
    $('#pre-step').click(function() {
        if (currentTab === 0) {
            return;
        }
		//Update By HouYanqiu 20170630
		if (currentTab === 1) {
            $("#inventory-step").show();
        } else {
			$("#inventory-step").hide();
		}


        currentTab--;
        //Update By Wangjin 20150612
		if (currentTab === 1) {
            $("#inventory-step").show();
        } else {
			$("#inventory-step").hide();
		}
        if (currentTab === 0) {
            $("#pre-step").html("Cancel");
        }
        if(currentTab ===3){
            $("#next-step").html("Submit");
        }
        else
        {
            $("#next-step").html("Next");
            $("#next-step").prop('href', "javascript:void(0);");
        }


        $wizard.find('a:eq(' + currentTab + ')').parent().removeClass('complete');
        $wizard.find('a:eq(' + currentTab + ')').tab('show');
        resetTab();
    });
    var resetTab = function() {
        $.each($wizard.find('a'), function(i, elem) {
            if ($(elem).parent().hasClass('complete')) {
                $(elem).bind('click', {
                    index: i
                }, tabClickHandler);
            } else {
                $(elem).unbind('tabClickHandler');
            }
        });
    };
    var tabClickHandler = function(e) {
        currentTab = e.data.index;
        $wizard.find('a:gt(' + currentTab + ')').unbind('click', tabClickHandler);
        $wizard.find('a:gt(' + currentTab + ')').parent().removeClass('complete');
        $(this).tab('show');

        //Update By Wangjin 20150612
        if (currentTab === 0) {
            $("#pre-step").html("Cancel");
        }
        if(currentTab ===3){
            $("#next-step").html("Submit");
        }
        else
        {
            $("#next-step").html("Next");
            $("#next-step").prop('href', "javascript:void(0);");
        }
    };
    //draggable
    $('#sortable-from, #sortable-to').sortable({
        items: '>tbody>tr',
        connectWith: '.sortable',
        helper: function(e, tr) {
            tr.children().each(function() {
                $(this).width($(this).width());
            });
            return tr;
        },
        stop: function() {
            $('#num-to-be-assigned').html($('#sortable-from>tbody>tr:not(.placeholder)').length);
            $('#num-already-assigned').html($('#sortable-to>tbody>tr:not(.placeholder)').length);
        }
    });
    //select all checkbox
    $('.table.sortable th input[type="checkbox"]').click(function() {
        var table = $(this).closest('table');
        $('td input:checkbox:visible', table).prop('checked', this.checked);
    });
    //click rows to check checkbox
    $('.table.sortable>tbody>tr>td:not(:first-child)').click(function() {
        var checked = $(this).parent().find(':checkbox').prop('checked');
        $(this).parent().find(':checkbox').prop('checked', !checked);
    });
    //table filter
    $('.table-filter').keyup(function() {
        var filter = $(this).val();
        var $rows = $(this).siblings().find('tbody>tr');
        $rows.each(function() {
            var txt = $(this).text().toLowerCase();
            if (txt.indexOf(filter) === -1) {
                $(this).hide();
            } else {
                $(this).show();
            }
        });
    });
    //existing or create select
    $('#existing-bka-select').selectpicker({
        'size': 10
    });
    $('#op-create').change(function() {
        if ($('#op-create').is(':checked')) {
            $('#existing-bka-select').selectpicker('hide');
            $('.bka-choice-panel>span').show();
            $('#bka-heading-new').show();
            $('#bka-heading-exist').hide();
            //update by wangjin 20150606
            $("#bka-selected-title").html("Create a new BKA");
        }
    });
    $('#op-edit').change(function() {
        if ($('#op-edit').is(':checked')) {
            $('#existing-bka-select').selectpicker('show').selectpicker('refresh');
            $('.bka-choice-panel>span').hide();
            $('#bka-heading-new').hide();
            $('#bka-heading-exist').show();
            //update by wangjin 20150606
            $("#bka-selected-title").html("Assign parts to BKA");
        }
    });
    //add & remove parts
    $('#add-parts').click(function() {
        $('#sortable-from,#sortable-to').find('tbody>tr').show();
        $('.table-filter').val('');
        var $selectedParts = $('#sortable-from tbody td input:checkbox:checked').parents('tr');
        $('#sortable-to>tbody').append($selectedParts.get().reverse());
        $selectedParts.find('input:checkbox').prop('checked', false);
        $('#num-to-be-assigned').html($('#sortable-from>tbody>tr:not(.placeholder)').length);
        $('#num-already-assigned').html($('#sortable-to>tbody>tr:not(.placeholder)').length);
        $('.table.sortable th input[type="checkbox"]').prop('checked', false);
        //if new BKA
        if ($('#op-create').is(':checked')) {
            $('#existing-bka-select').selectpicker('deselectAll');
        }
    });
    $('#remove-parts').click(function() {
        $('#sortable-from,#sortable-to').find('tbody>tr').show();
        $('.table-filter').val('');
        var $selectedParts = $('#sortable-to tbody td input:checkbox:checked').parents('tr');
        $('#sortable-from>tbody').append($selectedParts.get().reverse());
        $selectedParts.find('input:checkbox').prop('checked', false);
        $('#num-to-be-assigned').html($('#sortable-from>tbody>tr:not(.placeholder)').length);
        $('#num-already-assigned').html($('#sortable-to>tbody>tr:not(.placeholder)').length);
        $('.table.sortable th input[type="checkbox"]').prop('checked', false);
    });
    //calculate popover
    $('.auto-calc-btn').popover({
            trigger: 'manual',
            html: true,
            placement: 'bottom',
            content: '<div class="auto-calc-popover"><a href="javascript:void(0);">Carry over for empty weeks</a><a href="javascript:void(0);" class="btn btn-primary">Carry over for all weeks</a></div>',
            animation: true
        })
        .on('mouseenter', function() {
            var _this = this;
            $(this).popover('show');
            $('.popover').on('mouseleave', function() {
                $(_this).popover('hide');
            });
        }).on('mouseleave', function() {
            var _this = this;
            setTimeout(function() {
                if (!$('.popover:hover').length) {
                    $(_this).popover('hide');
                }
            }, 300);
        });
    //tree view IE8 fix
    $('.tree li .tree-panel:only-child, .tree li:only-child').addClass('only-child');
    //add supplier
    $('#add-supplier-btn').click(function() {
        var name = $('#new-name').val();
        var city = $('#new-city').val();
        var country = $('#new-country').val();
        $('#add-supplier-modal').modal('hide');
        $('#supplier-choose-table').bootstrapTable('insertRow', {
            index: 0,
            row: {
                sno: 'A123456',
                name: name,
                city: city,
                country: country
            }
        });
        $('#supplier-choose-table tbody tr:first-child').addClass('selected');
        $('#supplier-choose-table tbody tr:first-child input:radio').prop('checked', true);
    });
    //select plant
    $('#select-plant-btn').click(function(e) {
        e.preventDefault();
        var $selectedRow = $('#supplier-choose-table tbody tr input:radio:checked').parents('tr');
        var plantName = $selectedRow.find('td').eq(2).text();
        var plantCity = $selectedRow.find('td').eq(3).text();
        var plantCountry = $selectedRow.find('td').eq(4).text();
        if (plantName && plantCity && plantCountry) {
            $('#plant-name').text(plantName);
            $('#plant-city').text(plantCity);
            $('#plant-country').text(plantCountry);
            $('#plant-info-panel').show();
            $('#supplier-choose-modal').modal('hide');
            $('.add-tier-supplier-btn').show().tooltip('show');
            $('.edit-plant-btn').show();
            $('.tree-panel-btn').hide();
            setTimeout(function() {
                $('.add-tier-supplier-btn').tooltip('hide');
            }, 3000);
        }
    });
    //edit plant
    $('.edit-plant-btn').on('click',function(){
        $('.tree-panel-btn').show();
    });
    //select tier
    var $currentNode;
    var currentLevel = 1;
    $('.tree').tooltip({
        selector: '[data-toggle="tooltip"]',
        container: 'body'
    });
    $('#select-tier-btn').click(function(e) {
        e.preventDefault();
        var $selectedRow = $('#supplier-choose-table tbody tr input:radio:checked').parents('tr');
        var tierName = $selectedRow.find('td').eq(2).text();
        var tierCity = $selectedRow.find('td').eq(3).text();
        var tierCountry = $selectedRow.find('td').eq(4).text();
        var circleColor;
        var toolbarTag;
        if (currentLevel === 1) {
            circleColor = 'green';
            toolbarTag = '<a class="delete-tier-supplier-btn" href="javascript:void(0);" data-toggle="tooltip" data-placement="left" title="Delete"><i class="fa fa-minus-circle"></i></a>' +
                '<a class="add-tier-supplier-btn" href="javascript:void(0);" data-toggle="tooltip" data-placement="right" title="Add a sub-supplier"><i class="fa fa-plus-circle"></i></a>';
        } else if (currentLevel === 2) {
            circleColor = 'yellow';
            toolbarTag = '<a class="delete-tier-supplier-btn" href="javascript:void(0);" data-toggle="tooltip" data-placement="left" title="Delete"><i class="fa fa-minus-circle"></i></a>';
        }
        if (tierName && tierCity && tierCountry) {
            //add tier node
            var html = '<li>' +
                '<div class="tree-panel">' +
                '<div class="tree-panel-heading">' +
                '<span class="marker ' + circleColor + '"><i class="fa fa-circle"></i></span> ' + currentLevel + '-Tier Supplier' +
                '<div class="toolbar">' +
                toolbarTag +
                '</div>' +
                '</div>' +
                '<div class="tree-panel-body">' +
                '<h3>' + tierName + '</h3>' +
                '<div class="info"><i class="fa fa-fw fa-map-marker"></i> ' + tierCity + '</div>' +
                '<div class="info"><i class="fa fa-fw fa-flag"></i> ' + tierCountry + '</div>' +
                '</div>' +
                '</div>' +
                '</li>';
            $currentNode.show().append(html);
            $('.tree li').removeClass('only-child');
            $('.tree li .tree-panel:only-child, .tree li:only-child').addClass('only-child');
            //calculate widest node
            var maxnodelength = -1;
            $('.tree ul').each(function() {
                var m = $(this).find('>*').length;
                if (m > maxnodelength) {
                    maxnodelength = m;
                }
            });
            $('.tree').width((maxnodelength + 2) * 220);
            $('#supplier-choose-modal').modal('hide');
        }
    });
    //save as my company
    $('#save-as-company-btn').click(function() {
        var companyName = $('#com-name').text();
        var companyCity = $('#com-city').text();
        var companyCountry = $('#com-country').text();
        $('#plant-name').html(companyName);
        $('#plant-city').html(companyCity);
        $('#plant-country').html(companyCountry);
        $('#plant-info-panel').show();
        //show tootip & edit button
        $('.add-tier-supplier-btn').show().tooltip('show');
        $('.edit-plant-btn').show();
        $('.tree-panel-btn').hide();
        setTimeout(function() {
            $('.add-tier-supplier-btn').tooltip('hide');
        }, 3000);
    });
    $('#toggle-select-plant-btn').click(function() {
        $('#supplier-choose-modal .modal-header h4 span').html('Choose a plant:');
        $('#select-plant-btn').show();
        $('#select-tier-btn').hide();
        $('#supplier-choose-modal').modal('show');
    });
    //toggle add tier supplier
    $('.tree').on('click', '.add-tier-supplier-btn', function() {
        var $treepanel = $(this).closest('.tree-panel');
        currentLevel = $(this).closest('.tree-panel').parentsUntil('#tier-start-node', 'ul').length + 1;
        if ($treepanel.siblings('ul').length === 0) {
            $treepanel.parent().append('<ul style="display:none;"></ul>');
        }
        $currentNode = $treepanel.siblings('ul');
        $('#supplier-choose-modal .modal-header h4 span').html('Choose a tier supplier:');
        $('#select-plant-btn').hide();
        $('#select-tier-btn').show();
        $('#supplier-choose-modal').modal('show');
    });
    //delete tier supplier
    $('.tree').on('click', '.delete-tier-supplier-btn', function() {
        var $ul = $(this).closest('ul');
        $(this).tooltip('destroy');
        if ($ul.children().length === 1) {
            $ul.remove();

        } else {
            $(this).closest('li').remove();
        }
        $('.tree li').removeClass('only-child');
        $('.tree li .tree-panel:only-child, .tree li:only-child').addClass('only-child');
    });
    /************Admin Page***********/
    //bootstrap slider
    $('#bka-threshold-slider').slider();
    $('#bka-threshold-slider').on('slide', function(e) {
        $('#bka-threshold-start').html(e.value[0]);
        $('#bka-threshold-end').html(e.value[1]);
    });
    //Change role modal trigger
    $('#admin-user-list-table tbody tr td:last-child a').on('click', function() {
        $('#user-info-modal').modal('show');
    });
    $('#admin-role-list-table tbody tr td:last-child a:first-child').on('click', function() {
        $('#admin-config-role-modal').modal('show');
    });
    //role config treeview
    var getTree = function() {
        var tree = [{
            text: '系统',
            nodes: [{
                text: '零件需求管理',
                nodes: [{
                    text: '手工需求导入',
                    nodes: [{
                        text: '导入'
                    }]
                }, {
                    text: 'SAP需求导入',
                    nodes: [{
                        text: '导入'
                    }]
                }]
            }, {
                text: '计划预测需求管理',
                nodes: [{
                    text: '随意勾选 1-2-1'
                }, {
                    text: '随意勾选 1-2-2'
                }]
            }, {
                text: '计划预测报表',
                nodes: [{
                    text: '随意勾选 1-2-1'
                }, {
                    text: '随意勾选 1-2-2'
                }]
            }, {
                text: 'BKA管理',
                nodes: [{
                    text: '随意勾选 1-2-1'
                }, {
                    text: '随意勾选 1-2-2'
                }]
            }, {
                text: '基础数据管理管理',
                nodes: [{
                    text: '随意勾选 1-2-1'
                }, {
                    text: '随意勾选 1-2-2'
                }]
            }, {
                text: '系统管理',
                nodes: [{
                    text: '随意勾选 1-2-1'
                }, {
                    text: '随意勾选 1-2-2'
                }]
            }]
        }];
        return tree;
    };
    $('#role-config-tree').treeview({
        data: getTree(),
        showCheckbox: true
    }).treeview('expandAll', {
        levels: 1
    });
    //tigger edit plant/car model modal
    $('#admin-plant-list-table tbody>tr>td:last-child a:first-child').on('click', function() {
        $('#admin-edit-plant-modal').modal('show');
    });
    $('#admin-car-model-table tbody>tr>td:last-child a:first-child').on('click', function() {
        $('#admin-edit-car-model-modal').modal('show');
    });

    //update wangjin 20150610
    $('#admin-org-model-table tbody>tr>td:last-child a:first-child').on('click', function() {
        $('#admin-edit-org-model-modal').modal('show');
    });

    //trigger task log modal/edit task modal
    $('#admin-task-management-table .view-log-btn').on('click', function() {
        $('#admin-task-log-modal').modal('show');
    });
    $('#admin-task-management-table tbody>tr>td:last-child a:first-child').on('click', function() {
        $('#admin-edit-task-modal').modal('show');
    });
    //history filter
    $('.history .filter-bar li.all').on('click', function() {
        $(this).addClass('active');
        $(this).siblings('.multiple').removeClass('active');
    });
    $('.history .filter-bar li.multiple').on('click', function() {
        $(this).toggleClass('active');
        if ($(this).parent().find('>.multiple.active').length === 0) {
            $(this).siblings('.all').addClass('active');
        } else {
            $(this).siblings('.all').removeClass('active');
        }
    });
    //history & report datetimepicker
    $('#history-datetimepicker-from,#history-datetimepicker-to,#report-event-datetimepicker-from,#report-event-datetimepicker-to').datetimepicker({
        format: 'YYYY-MM-DD',
        icons: {
            time: 'fa fa-clock-o',
            date: 'fa fa-calendar',
            up: 'fa fa-arrow-up',
            down: 'fa fa-arrow-down'
        }
    });
    //report collapsible table
    $('#report-event-analysis-table tbody>tr').each(function() {
        if ($(this).is('.day')) {
            $(this).hide();
        }
    });
    $('#report-event-analysis-table tbody .year>td:first-child a').on('click', function(e) {
        e.preventDefault();
        $(this).find('i').toggleClass('fa-minus-square fa-plus-square');
        if ($(this).find('i').is('.fa-minus-square')) {
            $(this).closest('tr').nextUntil('.day').show();
        } else {
            $(this).closest('tr').nextUntil('.day').find('td:first-child a>i').removeClass('fa-minus-square').addClass('fa-plus-square');
            $(this).closest('tr').nextUntil('.year').hide();
        }
    });

    //update wangjin 20150611
    //$('#report-event-analysis-table tbody .month>td:first-child a').on('click', function(e) {
    //    e.preventDefault();
    //    $(this).find('i').toggleClass('fa-minus-square fa-plus-square');
    //    if ($(this).find('i').is('.fa-minus-square')) {
    //        $(this).closest('tr').nextUntil('.year').show();
    //    } else {
    //        $(this).closest('tr').nextUntil('.year').hide();
    //    }
    //});

    $('#report-event-analysis-table tbody .month>td:first-child a').on('click', function(e) {
        e.preventDefault();
        $(this).find('i').toggleClass('fa-minus-square fa-plus-square');
        if ($(this).find('i').is('.fa-minus-square')) {
            $(this).closest('tr').nextUntil('.month').show();
        } else {
            $(this).closest('tr').nextUntil('.month').hide();
        }
    });




    //update by wangjin 20150606
    $('#bka-search-tabs a').click(function (e) {
      /*e.preventDefault();
      $(".tab-pane").hide();
      $(this).tab('show');
      */
      $(".tab-pane").hide();
      var id= $(this).attr("href");
      console.log(id);

      $(id).show();
      if(id.substring(0, 4)=="#bka")
      {
        $(".task-list li").hide();
        $(".bka-action").show();
        if($("#bka-tab-map").is(":visible")){
            $("#show-map-a").hide();
            $("#hide-map-a").show();
        }
      }
      else if(id.substring(0, 5)=="#part")
      {
         $(".task-list li").hide();
         $(".part-action").show();
         if($("#part-tab-map").is(":visible")){
            $("#show-map-a").hide();
            $("#hide-map-a").show();
        }
      }
      else if(id.substring(0, 5)=="#post")
      {
          $(".task-list li").hide();
          $(".post-action").show();

      }
      else{
          $(".task-list li").hide();
          $(".company-action").show();
      }
      
      
      
      
    })
    //Start Page React Hover To Show Chart
    //uodate by wangjin 20150617
    var hoverTimer;
    $('#bka-react-chart-btn ').hover(function() {
        var $chart = $(this).find('.hover-wrapper');
        if (hoverTimer) {
            clearTimeout(hoverTimer);
            hoverTimer = null;
        }
        hoverTimer = setTimeout(function() {
            $chart.addClass('hover');
        }, 1000);
    }, function() {
        var $chart = $(this).find('.hover-wrapper');
        if (hoverTimer) {
            clearTimeout(hoverTimer);
            hoverTimer = null;
        }
        $chart.removeClass('hover');
    });
    // Admin Supplier Info
    $('#admin-supplier-info-table tbody>tr>td:last-child a').click(function() {
        $('#admin-supplier-info-modal').modal('show');
    });
    //Relevance Control Table
    $('#admin-relevance-control-table').sortable({
        items: '>tbody>tr',
        connectWith: '.sortable',
        helper: function(e, tr) {
            tr.children().each(function() {
                $(this).width($(this).width());
            });
            return tr;
        }
    });
    //Bka search result hover to show parts
    $('.bka-table .has-detail-info a').hover(function() {
        var $detail = $(this).siblings('.detail-info-panel');
        if (hoverTimer) {
            clearTimeout(hoverTimer);
            hoverTimer = null;
        }
        hoverTimer = setTimeout(function() {
            $detail.fadeIn();
        }, 1000);
    }, function() {
        var $detail = $(this).siblings('.detail-info-panel');
        if (hoverTimer) {
            clearTimeout(hoverTimer);
            hoverTimer = null;
        }
        $detail.fadeOut();
    });


    //Update wangjin 2015-06-11
    $(".btnGlobalSearch").click(function (e) {
        location.href="search.html";
        return false;
    });
    $("#byweek").click(function (e) {
        $(".byweek").show();
        $(".byperiod").hide();
    });
    $("#byperiod").click(function (e) {
         $(".byperiod").show();
        $(".byweek").hide();
    });

     $("#s-invalid-parts").click(function (e) {
        if($(this).is(':checked'))
        {
            $(".invalidBKA").show();
        }
        else
        {
            $(".invalidBKA").hide();
        }
    });



    //update by wangjin 20150617
    $('.icon-Favority-out').click(function() {
        //Update wangjin 20150611
        $(this).find('i').toggleClass('ion-ios-star-outline');
    });
    $('.icon-Favority').click(function() {
        //Update wangjin 20150611
        $(this).find('i').toggleClass('ion-ios-star-outline');
    });

    $('.btn-expand').on('click', function(e) {
        $("#report-event-analysis-table tbody .day").show();
        $("#report-event-analysis-table tbody .month").each(function(){
            $(this).find('i').removeClass('fa-plus-square').addClass('fa-minus-square')
        });
    });

    $('.btn-collapse').on('click', function(e) {

        $("#report-event-analysis-table tbody .day").hide();
        $("#report-event-analysis-table tbody .month").each(function(){
            $(this).find('i').removeClass('fa-minus-square').addClass('fa-plus-square')
        });
    });

    $('.addManually').on('click', function(e) {

        $("#newtlkrow").show();

    });

    //update by wangjin 20150621
     $("#profile-tab .editEmail").click(function(){
                $(".profileDisplay").hide();
                $(".profileValue").show();
                $(".editAction").show();
                $(".editEmail").hide();
    });

    $("#profile-tab .editAction").click(function(){
        $(".profileDisplay").show();
        $(".profileValue").hide();
        $(".editAction").hide();
        $(".editEmail").show();
    });


      $("#new-country").change(function(){
           if($("#new-country").val()==="China")
           {
                $(".Province").hide();
                $(".ProvinceCN").show();
                $(".CityCN").show();
                $(".City").hide();
           }
           else
           {
                $(".Province").show();
                $(".ProvinceCN").hide();
                $(".CityCN").hide();
                $(".City").show();
           }

      });

  $('#show-map-a').on('click', function () {
    var bkaTab = $('#bka-tab');
    var partTab = $('#part-tab');
    var companiesTab = $('#companies-tab');
    var activeTab = null;
    var activeId = null;

    if (bkaTab.hasClass('active')) {
      activeTab = bkaTab;
      activeId = '#bka-tab';
    } else if (partTab.hasClass('active')) {
      activeTab = partTab;
      activeId = '#part-tab'
    } else if (companiesTab.hasClass('active')) {
      activeTab = companiesTab;
      activeId = '#companies-tab';
    }
    if (activeTab === bkaTab || activeTab === partTab) {
      // 隐藏thead
      var table = activeTab.find('table');
      table.addClass('inline-lg');
      table.find('thead tr th').hide();
      table.find('thead tr th.see-in-map').show();
      // 隐藏tbody
      var tbodyTrs = table.find('tbody tr');
      tbodyTrs.find('td').hide();
      tbodyTrs.find('td.see-in-map').show();
      $(activeId + ' .only-see-in-map').show();
    } else {
        $('.ul-supp-parent').addClass('see-in-map');
    }
    // 显示地图
    $(activeId + '-map').show();
    // 转化按钮
    $('#show-map-a').hide();
    $('#hide-map-a').show();
  });

  $('#hide-map-a').on('click', function () {
    var bkaTab = $('#bka-tab');
    var partTab = $('#part-tab');
    var companiesTab = $('#companies-tab');
    var activeTab = null;
    var activeId = null;

    if (bkaTab.hasClass('active')) {
      activeTab = bkaTab;
      activeId = '#bka-tab';
    } else if (partTab.hasClass('active')) {
      activeTab = partTab;
      activeId = '#part-tab'
    } else if (companiesTab.hasClass('active')) {
      activeTab = companiesTab;
      activeId = '#companies-tab'
    }
    if (companiesTab === activeTab) {
      $('.ul-supp-parent').removeClass('see-in-map');
    } else {
      // 隐藏thead
      var table = activeTab.find('table');
      table.removeClass('inline-lg');
      table.find('thead tr th').show();
      table.find('thead tr th :checkbox').parent().hide();
      // 隐藏tbody
      table.find('tbody tr td').show();
      table.find('tbody tr td :checkbox').parent().hide();
      $(activeId + ' .only-see-in-map').hide();
    }

    // 显示地图
    $(activeId + '-map').hide();
    // 转化按钮
    $('#show-map-a').show();
    $('#hide-map-a').hide();

  });

  $('.add-post-panel-btn-group').on('click', 'button', function () {
      $('.add-post-panel-btn-group .btn-primary').removeClass('btn-primary').addClass('btn-default');
      $(this).removeClass('btn-default').addClass('btn-primary');
  })


  $('#sub-bka-select').on('change', function () {
    $('#sub-bka-title').text($(this).val())
  })

  $('.switch-button').on('click', 'button', function () {
    if ($(this).hasClass('btn-primary')) {
      return
    }
    $(this).siblings('.btn-primary').removeClass('btn-primary');
    $(this).removeClass('btn-default').addClass('btn-primary');
  })


});




function downloadReport(flag){
            if(flag=="1")
            {
                window.location="/template/BKA_overview.xlsx";
            }
            else if(flag=="2")
            {
                window.location="/template/Capacity Filling Level.xls";
            }
            else if(flag=="3")
            {
                 window.location="/template/BKA_overview.xlsx";
            }
            else if(flag=="4")
            {
                window.location="/template/BKA_overview.xlsx";
            }
            else if(flag=="5")
            {
                window.location="/template/Supplier.xls";
            }
            else if(flag=="6")
            {
                window.location="/template/BKA_overview.xlsx";
            }
            else if(flag=="7")
            {
                window.location="/template/TLK Overview.xls";
            }
            else if(flag=="8")
            {
                window.location="/template/history.xls";
            }
             else if(flag=="9")
            {
                window.location="/template/EventAnalysis.xls";
            }
             else if(flag=="10")
            {
                window.location="/template/Capacity Filling Level.xls";
            }
            else if(flag=="11")
            {
                window.location="/template/BKA_overview.xlsx";
            }
            else if(flag=="12")
            {
                window.location="/template/Supplier.xls";
            }
            else if(flag=="13")
            {
                window.location="/template/Report.xls";
            }
            else if(flag=="14")
            {
                window.location="/template/history.xls";
            }
             else if(flag=="15")
            {
                window.location="/template/Demand.xlsx";
            }
            else if(flag=="16")
            {
                window.location="/template/TLK Overview.xls";
            }
             else if(flag=="17")
            {
                window.location="/template/BKA.xls";
            }
             else if(flag=="18")
            {
                window.location="/template/Supplier.xls";
            }
            else if(flag=="19")
            {
                window.location="/template/SubSupplier.xls";
            }
             else if(flag=="20")
            {
                window.location="/template/Plant.xls";
            }
             else if(flag=="21")
            {
                window.location="/template/Car Model.xls";
            }
            else if(flag=="22")
            {
                window.location="/template/Organization.xls";
            }
            else if(flag=="23")
            {
                window.location="/template/RelevanceTestReport.xls";
            }
        }

