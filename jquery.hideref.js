/*
 * Copyright (c) 2013 mono
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function($) {
  $.fn.hideref = (function() {
    if ($.browser.webkit) {
      return function() {
        return $(this).attr('rel', 'noreferrer');
      };
    }
    else if ($.browser.msie) {
      return function() {
        return $(this).click(function() {
          window.open($(this).attr('href'));
          return false;
        });
      };
    }
    else if ($.browser.opera) {
      return function() {
        return $(this).each(function() {
          $(this).attr('href', 'https://www.google.com/url?q=' + encodeURIComponent(this.href));
        });
      };
    }
    return function() {
      return $(this).each(function() {
        var html = [
          '<html><head><script type="text/javascript"><!--\n',
          'document.write(\'<meta http-equiv="refresh" content="0;url=', this.href, '">\');',
          '// --><', '/script></head><body></body></html>'
        ].join('');
        $(this).attr('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(html));
      });
    };
  })();
})(jQuery);
