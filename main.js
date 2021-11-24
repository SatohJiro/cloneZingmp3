"use strict";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
// logout
const logOutOption = $(".app__header-options.options--logout");
const logOutBtn = $(".option__log-out");
// setting
const navSettingBtn = $(".header__nav-btn.btn--nav-setting");
const navSettingMenu = $(".setting__menu");
// theme
const modalTheme = $(".modal-theme");
const closeModalBtn = $(".modal__close-btn");
const navThemeBtn = $(".header__nav-btn.nav-btn--theme");
// sidebar nav
const sidebarNav = $(".sidebar__nav");
const sidebarNavItems = Array.from($$(".sidebar__nav .sidebar__nav-item"));
// sidebar subnav
const sidebarSubnav = $(".sidebar__subnav");
const sidebarSubnavItems = Array.from($$(".sidebar__subnav .subnav--item"));
const sildeImgs = $$(".container__slide-item");
// header
const header = $(".header");
const headerNavTitles = $$(".tab-home .container__header-title");
// tab
const containerTabs = $$(".container__tab");
const navbarItems = Array.from($$(".content__navbar-item"));
// slide playlist
const playlistLists = Array.from($$(".playlist--container"));
const playlistScrollBtns = $$(".container__move-btn.move-btn--playlist");
//  slide album
const albumLists = Array.from($$(".album--container"));
const albumScrollBtns = $$(".container__move-btn.move-btn--album");
//  slide mv
const mvLists = Array.from($$(".mv--container"));
const mvScrollBtns = $$(".container__move-btn.move-btn--mv");
// slide artist
const artistLists = Array.from($$(".artist--container"));
const artistScrollBtns = $$(".container__move-btn.move-btn--artist");
//
const newPlaylistLists = Array.from($$(".new-playlist--container"));
// player title animation
const songAnimateTitles = Array.from($$(".player__title-animate"));
//app
const App = $(".app");
const appContainers = Array.from($$(".app__container"));

const app = {
  scrollToRight: [true, true, true, true, true, true, true, true, true, true], // use when click move btn
  slideIndexs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //Index of Each tab  (playlist, album, mv, artist)
  slideSelectors: [
    ".tab-home .playlist--container .row__item.item--playlist",
    ".tab-home .album--container .row__item.item--album",
    ".tab-home .mv--container .row__item.item--mv",
    ".tab-home .artist--container .row__item.item--artist",
    ".tab--explore .radio--container .row__item.item--radio",
    ".tab--explore .singer-slide--container .singer__slide-item",
    ".tab--explore .new-playlist--container .row__item.item--new-playlist",
    ".tab--explore .fav-artist--container .row__item.item--fav-artist",
    ".tab--radio .radio--container .row__item.item--radio",
    ".tab--following .singer-slide--container .singer__slide-item",
  ],
  slideTitleWidth: 0, //Width of player title on footer

  handleEvents: function () {
    const _this = this;
    let imgIndex = 2;
    const newPlaylistMove = $(".container__header-actions.new-playlist--move");
    const newPlaylistMoveBtns = Array.from($$("move-btn--new-playlist"));
    //
    // handle when click on sidebar nav
    sidebarNavItems.forEach((navItem) => {
      navItem.onclick = (e) => {
        showNotificationToast(
          "Tính năng hiện chưa được cập nhật, bạn vui lòng thông cảm!"
        );
      };
    });
    // Handle when click on sidebar subnav
    sidebarSubnavItems.forEach((subnavItem) => {
      subnavItem.onclick = (e) => {
        showNotificationToast(
          "Tính năng hiện chưa được cập nhật, bạn vui lòng thông cảm!"
        );
      };
    });

    // Handle when click on navbar
    navbarItems.forEach((navbarItem, index) => {
      navbarItem.onclick = function () {
        $(".content__navbar-item.active ").classList.remove("active");
        navbarItem.classList.add("active");

        $(".container__tab.active").classList.remove("active");
        containerTabs[index].classList.add("active");
      };
    });
    Array.from(headerNavTitles).forEach((headerNavTitle, index) => {
      headerNavTitle.onclick = (e) => {
        appContainers[0].scrollTop = 0;
        $(".content__navbar-item.active").classList.remove("active");
        navbarItems[index + 1].classList.add("active");

        $(".container__tab.active").classList.remove("active");
        containerTabs[index + 1].classList.add("active");
      };
    });
    function slideShow() {
      const slideImgFirst = $(".container__slide-item.first");
      const slideImgSecond = $(".container__slide-item.second");
      const slideImgThird = sildeImgs[imgIndex];
      const slideImgFourth =
        sildeImgs[imgIndex === sildeImgs.length - 1 ? 0 : imgIndex + 1];
      slideImgFourth.classList.replace("fourth", "third");
      slideImgThird.classList.replace("third", "second");
      slideImgSecond.classList.replace("second", "first");
      slideImgFirst.classList.replace("first", "fourth");
      imgIndex++;
      if (imgIndex >= sildeImgs.length) {
        imgIndex = 0;
      }
      setTimeout(slideShow, 2000);
    }
    slideShow();

    //***  Handle when click button move Album, Playlist, MV and Artist on tab HOME
    // Playlist
    playlistScrollBtns[0].onclick = function () {
      _this.showSlides(-5, 0, playlistLists[0], playlistScrollBtns);
    };

    playlistScrollBtns[1].onclick = function () {
      _this.showSlides(5, 0, playlistLists[0], playlistScrollBtns);
    };
    // Album
    albumScrollBtns[0].onclick = function () {
      _this.showSlides(-5, 1, albumLists[0], albumScrollBtns);
    };
    albumScrollBtns[1].onclick = function () {
      _this.showSlides(5, 1, albumLists[0], albumScrollBtns);
    };
    // Mv
    mvScrollBtns[0].onclick = function () {
      _this.showSlides(-3, 2, mvLists[0], mvScrollBtns);
    };
    mvScrollBtns[1].onclick = function () {
      _this.showSlides(3, 2, mvLists[0], mvScrollBtns);
    };
    // Artist
    artistScrollBtns[0].onclick = function () {
      _this.showSlides(-5, 3, artistLists[0], artistScrollBtns);
    };
    artistScrollBtns[1].onclick = function () {
      _this.showSlides(5, 3, artistLists[0], artistScrollBtns);
    };
    // New playlist slide
    function newPlaylistSlideShow(step) {
      // Automatic slide
      if (_this.scrollToRight[6] === true) {
        _this.showSlides(step, 6, newPlaylistLists[0], newPlaylistMoveBtns);
      } else {
        _this.showSlides(-step, 6, newPlaylistLists[0], newPlaylistMoveBtns);
      }
      let newPlaylistId = setTimeout(function () {
        newPlaylistSlideShow(step);
      }, 4000);

      newPlaylistLists.forEach((newPlaylistList) => {
        newPlaylistList.ontouchmove = (e) => {
          clearTimeout(newPlaylistId);
          newPlaylistId = setTimeout(function () {
            newPlaylistSlideShow(step);
          }, 4000);
        };
      });

      // Handle when click on new playlist slide move buttons
      newPlaylistMove.onclick = (e) => {
        const prevBtn = e.target.closest(".move-btn--new-playlist.btn--prev");
        const nextBtn = e.target.closest(".move-btn--new-playlist.btn--next");
        if (nextBtn) {
          _this.showSlides(step, 6, newPlaylistLists[0], newPlaylistMoveBtns);
          clearTimeout(newPlaylistId);
          newPlaylistId = setTimeout(function () {
            newPlaylistSlideShow(step);
          }, 4000);
        }
        if (prevBtn) {
          _this.showSlides(-step, 6, newPlaylistLists[0], newPlaylistMoveBtns);
          clearTimeout(newPlaylistId);
          newPlaylistId = setTimeout(function () {
            newPlaylistSlideShow(step);
          }, 4000);
        }
      };
    }
    // open and close modal theme
    navThemeBtn.onclick = (e) => {
      modalTheme.classList.add("open");
    };
    modalTheme.onclick = (e) => {
      const themeContainer = e.target.closest(".modal-theme .modal-container");
      if (themeContainer) {
        e.stopPropagation();
      } else {
        modalTheme.classList.remove("open");
      }
    };
    closeModalBtn.onclick = (e) => {
      modalTheme.classList.remove("open");
    };
    document.onclick = (e) => {
      navSettingMenu.classList.remove("open");
      logOutBtn.classList.remove("open");
    };
    // handle when click setting btn
    navSettingBtn.onclick = (e) => {
      e.stopPropagation();
      navSettingMenu.classList.toggle("open");
    };
    // hanlde when click setting option
    navSettingMenu.onclick = (e) => {
      e.stopPropagation();
    };
    //  handle when click logout btn
    logOutBtn.onclick = (e) => {
      e.stopPropagation();
    };
    //  handle when click logout option
    logOutOption.onclick = (e) => {
      e.stopPropagation();
      logOutBtn.classList.toggle("open");
    };
  },

  // Handle title runs/stops
  titleAnimate(title) {
    // Smooth Animation
    this.smoothAnimation(title);
    const titleAnimate = title.animate(
      [
        { transform: "translate(0px)" },
        { transform: `translateX(-${this.slideTitleWidth}px)` },
      ],
      {
        duration: 21 * this.slideTitleWidth,
        iterations: Infinity,
      }
    );
    titleAnimate.pause();
    return titleAnimate;
  },
  smoothAnimation(element) {
    element.style.willChange = "transform, opacity";
  },

  getSlideIndex(step, slideOrder, listItems, listBtn) {
    this.slideIndexs[slideOrder] += step;
    // at start
    if (this.slideIndexs[slideOrder] + step > listItems.length - 1) {
      this.slideIndexs[slideOrder] = listItems.length - 1;
      listBtn[1].classList.add("button--disabled");
      listBtn[0].classList.remove("button--disabled");
      this.scrollToRight[slideOrder] = false;
      // at end
    } else if (this.slideIndexs[slideOrder] + step < 0) {
      this.slideIndexs[slideOrder] = 0;
      listBtn[0].classList.add("button--disabled");
      listBtn[1].classList.remove("button--disabled");
      this.scrollToRight[slideOrder] = true;
      // at between
    } else {
      listBtn[0].classList.remove("button--disabled");
      listBtn[1].classList.remove("button--disabled");
    }
  },
  showSlides(step, slideOrder, listContainer, listBtn) {
    const listItems = $$(this.slideSelectors[slideOrder]);
    this.getSlideIndex(step, slideOrder, listItems, listBtn);
    const currentIndex = Math.floor(
      this.slideIndexs[slideOrder] / Math.abs(step)
    );
    // Scroll Into View
    listContainer.scrollLeft = listContainer.offsetWidth * currentIndex;
  },
  start: function () {
    this.handleEvents();
  },
};
app.start();
