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
            this.removeSaying();
            this.removeBlockUserBroadcast();
        },

        getBlockList: function() {
            // Add more people you want to stop in this list.
            this.blockList = ['168649262'];
        },

        removeSaying: function() {
            //new-status status-wrapper    saying
            var $repost = $('.stream-items').find('.new-status');
            var blockList = this.blockList;
            $repost.each(function() {
                var userReg = /people\/(.+)\/status/;
                var user = $(this).attr('data-uid');
                if (blockList.indexOf(user) !== -1) {
                    $(this).remove();
                }
            });
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
