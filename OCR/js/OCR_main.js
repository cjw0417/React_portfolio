    // 웹접근성 - 초점공통
    var $eleFocusTags = 'input:not([tabindex]), button:not([tabindex]), a:not([tabindex]), select:not([tabindex]), textarea:not([tabindex])';
    var $eleTabindex ='[tabindex="0"]';
    var $eleTabindexM = '[tabindex="-1"]';

    // 포커스 비활성화
    function commonAccessDisable($eleDisable, module){
        $eleDisable.attr({'aria-hidden':'true'}).addClass('is-disable-'+module+'-ariaHidden');
        $eleDisable.find($eleTabindexM).addClass('is-disable-'+module+'-fixed');
        $eleDisable.find($eleFocusTags).attr({'tabindex':'-1'}).addClass('is-disable-'+module+'-tags');
        $eleDisable.find($eleTabindex).attr({'tabindex':'-1'}).addClass('is-disable-'+module+'-tabindex');
    }

    // 포커스 활성화
    function commonAccessEnable($eleEnable, module){
        $eleEnable.attr({'aria-hidden':'false'}).removeClass('is-disable-'+module+'-ariaHidden');
        $eleEnable.find('.is-disable-'+module+'-tags').removeClass('is-disable-'+module+'-tags').removeAttr('tabindex');
        $eleEnable.find('.is-disable-'+module+'-tabindex').removeClass('is-disable-'+module+'-tabindex').attr({'tabindex':'0'});
        $eleEnable.find('.is-disable-'+module+'-fixed').removeClass('is-disable-'+module+'-fixed');
    }

    $(document).ready(function(){
        // 레이어팝업 최대 높이 600px 초과시 그라데이션 생성
        var $gradpop = $('.sbj_bottom');
        var $sbjpopcont = $gradpop.find('.pop_cont');
        if ($gradpop.prop('scrollHeight') > 600) {
            $('.gradient_over').css({display: 'block'});
        } else {
            $('.gradient_over').css({display: 'none'});
        }
    
        var $lastFocusedElement = null; // 마지막 포커스 저장
    
        // 팝업 오픈 함수
        var $sbjOpen = function(selector, keepFocus = false) {
            commonAccessDisable($('#wrap'), 'modal');
            commonAccessDisable($('#skipNavi'), 'modal');
    
            if (!keepFocus) {
                $lastFocusedElement = $(':focus');
            }
            $(selector).css('display', 'flex').hide().fadeIn(300, function() {
                $(this).find('.popup').css({bottom: '-100%'}).animate({bottom: '0'}, 100);
            }).addClass('is_active');
        };
    
        // 팝업 닫기 함수
        var $sbjClose = function(selector) {
            $(selector).find('.popup').animate({bottom: '-100%'}, 100, function(){
                $(selector).fadeOut(200).removeClass('is_active');
            });
    
            if ($lastFocusedElement) {
                $lastFocusedElement.focus();
                $lastFocusedElement = null;
            }
        };
    
        var $sbjOpen = function(selector, keepFocus = false, keepPrevOpen = false) {
            commonAccessDisable($('#wrap'), 'modal');
            commonAccessDisable($('#skipNavi'), 'modal');
        
            if (!keepFocus) {
                $lastFocusedElement = $(':focus');
            }
            if (!keepPrevOpen) {
                $('.pop_wrap').not(selector).fadeOut(200).removeClass('is_active'); // 이전 팝업 닫기
            }
            $(selector).css('display', 'flex').hide().fadeIn(300, function() {
                $(this).find('.popup').css({bottom: '-80%'}).animate({bottom: '0'}, 100);
            }).addClass('is_active');
        };
        
        // Sbjpop02의 '모바일 외국인등록증' 클릭 시 Sbjpop03 팝업 열기 (이전 팝업 닫지 않음)
        $('#Sbjpop02 .sbj_foreignID').on('click', function(){
            $sbjOpen('#Sbjpop03', true, true);  // Sbjpop03 열기, Sbjpop02 닫지 않음
        });

        // Sbjpop02의 '모바일 외국인등록증' 클릭 시 Sbjpop03 팝업 열기
        $('#Sbjpop02 .sbj_foreignID').on('click', function(){
            $sbjOpen('#Sbjpop03', true);  // Sbjpop03 열기
        });
    
        // Sbjpop03 닫기 버튼 클릭 시 Sbjpop03 닫고 Sbjpop02 다시 열기
        $('#Sbjpop03 .sbjpop_close').on('click', function(){
            $sbjClose('#Sbjpop03');
            $sbjOpen('#Sbjpop02', true);
        });
    
        // Sbjpop03의 리스트 버튼 클릭 시 Sbjpop03 닫고 Sbjpop02 다시 열기
        $('#Sbjpop03 .btn-group4-btn').click(function(){
            $sbjClose('#Sbjpop03');
            $sbjOpen('#Sbjpop02', true);
        });
    
        $('#Sbjpop02 .sbjpop_close').on('click', function(){
            commonAccessDisable($('#Sbjpop01'), 'modal');
            $sbjClose($(this).parents('.pop_wrap'));
            $sbjOpen('#Sbjpop01', true);
            $('.btn-group4-item').removeClass('active');
        });
    
        $('#Sbjpop01 .mob-id').on('click', function() {
            $lastFocusedElement = $(this);
            $sbjOpen('#Sbjpop02', true);
        });
    
        $sbjOpen('#Sbjpop01');
    
        $('#Sbjpop01 .pop-close').click(function() {
            commonAccessDisable($('#wrap'), 'modal');
            commonAccessDisable($('#skipNavi'), 'modal');
            $('#Sbjpop01').css('display', 'none');
        });
    
        $('#Sbjpop02 .btn-group4-btn').click(function(){
            $('#Sbjpop02 .btn-group4-item').removeClass('active');
            $(this).closest('.btn-group4-item').addClass('active');
        });
    });
    
    