(function() {
    $.ajax({
        url: 'https://www.douban.com/contacts/blacklist',
        success: function(data) {
            var doubanBlockList = new DelBlockUser(data);
            doubanBlockList.init();
        }
    });

    var DelBlockUser = function(html) {
        this.html = html;
    };

    DelBlockUser.prototype = {
        constructor: DelBlockUser,

        init: function() {
            this.getBlockList();
            this.removeBlockUserBroadcast();
        },

        getBlockList: function() {
            var $blockDom = $(this.html).find('.obu');
            var tempArr = [];

            $blockDom.each(function() {
                var userReg = /people\/(.+)\//;
                var user = $(this).find('dd').find('a').attr('href');
                tempArr.push(user.match(userReg)[1]);
            });

            this.blockList = tempArr;
        },

        removeBlockUserBroadcast: function() {
            var $repost = $('.stream-items').find('.status-reshared-wrapper');
            var blockList = this.blockList;
            $repost.each(function() {
                var userReg = /people\/(.+)\/status/;
                var url = $(this).find('.status-real-wrapper').find('.hd').attr('data-status-url');
                var user = url.match(userReg)[1];
                if (blockList.indexOf(user) !== -1) {
                    $(this).remove();
                }
            });
        }
    };


})();
