var KTnoUiSliderDemos = {
    init: function() {
        ! function() {
            var e = document.getElementById("kt_nouislider_1");
            noUiSlider.create(e, {
                start: [20],
                step: 1,
                range: {
                    min: [1],
                    max: [100]
                },
                format: wNumb({
                    decimals: 0
                })
            });
            var n = document.getElementById("kt_nouislider_1_input");
            e.noUiSlider.on("update", (function(e, t) {
                n.value = e[t]
            })), n.addEventListener("change", (function() {
                e.noUiSlider.set(this.value)
            }))
        }()
    }
};
jQuery(document).ready((function() {
    KTnoUiSliderDemos.init()
}));