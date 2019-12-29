<template>
    <view class="numboxShopping">
        <template v-if="inputValue > 0">
            <view class="numboxShopping__minus" :class="{ numboxShopping__disabled: disableReduce }"  @click="_calcValue('subtract')">-</view>
            <input class="numboxShopping__value" type="number" :disabled="disabled" :value="inputValue" @blur="_onBlur" />
            <view class="numboxShopping__plus" :class="{ numboxShopping__disabled: disableAdd }" @click="_calcValue('add')">+</view>
        </template>
        <template v-else-if="inputValue == 0">
            <view class="numboxShopping__minus" :class="{ numboxShopping__disabled: disableReduce }" @click="_calcValue('subtract')">-</view>
            <input class="numboxShopping__value" type="number" disabled="true" :value="inputValue" @blur="_onBlur" />
            <view class="numboxShopping__plus" :class="{ numboxShopping__disabled: disableAdd }" @click="_calcValue('add')">+</view>
        </template>
        <template v-else>
            <view class="numboxShopping__minus" :class="{ numboxShopping__disabled: disableReduce }" @click="_calcValue('subtract')">-</view>
            <input class="numboxShopping__value" type="number" disabled="true" :value="inputValue" @blur="_onBlur" />
            <view class="numboxShopping__plus" :class="{ numboxShopping__disabled: disableAdd }" @click="_calcValue('add')">+</view>
        </template>
    </view>
</template>
<script>
import uniIcon from '@/components/uni-icon/uni-icon.vue';

export default {
    components: {
        uniIcon
    },
    props: {
        value: {
            type: Number,
            default: 0
        },
        index: {
            type: [Number, Array],
            default: 0
        },
		min:{
			type: Number,
			default: 0
		},
        max: {
            type: Number,
            default: 10
        },
        step: {
            type: Number,
            default: 1
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            inputValue: this.value
        };
    },
    computed: {
        disableAdd() {
            return this.value >= this.max;
        },
		disableReduce(){
			 return this.value <= this.min;
		}
    },
    watch: {
        value(val) {
            this.inputValue = val;
        },
        inputValue(val) {
            this.$emit('change', val, this.index);
        }
    },
    methods: {
        _click() {
            this.$emit('click', this.index);
        },
        _calcValue(type) {
            const scale = this._getDecimalScale();
            let value = this.inputValue * scale;
            let step = this.step * scale;

            if (type === 'subtract') {
                value -= step;
            } else if (type === 'add') {
                value += step;
            }
            if (value > this.max) {
                return;
            }
			if(value < this.min){
				return;
			}
            this.inputValue = value / scale;
        },
        _getDecimalScale() {
            let scale = 1;
            // 浮点型
            if (~~this.step !== this.step) {
                scale = Math.pow(10, (this.step + '').split('.')[1].length);
            }
            return scale;
        },
        _onBlur(event) {
            let value = event.detail.value;
			console.log(value);
            if (!value) {
                this.inputValue = 0;
                return;
            }
            value = +value;
            if (value > this.max) {
                value = this.max;
            } else if (value < 0) {
                value = 0;
            }
            this.inputValue = value;
        }
    }
};
</script>

<style lang="scss">
@import '@/style/mixin/flex.scss';

.numboxShopping {
    @include flex(center, center);
    height: 40upx;

    &__minus,
    &__plus {
        @include flex-self(keep);
        width: 40upx;
        height: 40upx;
        text-align: center;
        line-height: 40upx;
        border-radius: 50%;
		font-size:22upx;
		font-family:PingFangSC-Semibold;
		font-weight:600;
		color:rgba(74,74,74,1);
        background-color: #D8D8D8;
		opacity: 0.39;
    }

    &__value {
        width: 75upx;
        font-weight:600;
		color:rgba(74,74,74,1);
        text-align: center;
		font-size: 22upx;
    }

    &__disabled {
        background-color: $uni-text-color-disable;
    }

    &__empty {
        @include flex(null, center);
        height: 40upx;
        line-height: 1;
        padding: 0 20upx 0 8upx;
        font-size: 24upx;
        color: #fff;
        background-color: $uni-color-primary;
        border-radius: 40upx;
    }

    &__helper {
        @include flex(around, center);
        height: 40upx;
        box-sizing: border-box;
        min-width: 140upx;
        padding: 0 16upx;
        font-size: 24upx;
        color: $uni-color-warning;
        border: 1px solid $uni-color-warning;
        border-radius: 40upx;
        
        &__error{
            color: $uni-color-error;
            border: 1px solid $uni-color-error;
        }
    }
}
</style>
