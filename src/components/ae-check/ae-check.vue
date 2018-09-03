<template>
  <label class="ae-check">
    <input :type="type" :name="name" :value="value" :disabled="disabled">
      :id="id"
    <span class="indicator">
      ✓
    </span>
  </label>
</template>
<script>
export default {
  name: 'ae-check',
  props: {
    /**
     * ID of the component/input
     */
    id: String,

    /**
     * Name of component
     */
    name: String,

    /**
     * value of component
     */
    value: Boolean,

    /**
     * Define the type of the input
     */
    type: {
      type: String,
      default: 'checkbox',
    },

    /**
     * Puts the component in disabled state
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
  @import '../../styles/variables/colors';
  @import '../../styles/variables/animations';
  @import '../../styles/variables/typography';

  .ae-check {
    input {
      display: none;

      &:checked + .indicator {
        background: $color-emphasis;
        border-color: $color-emphasis;
        color: $color-white;
      }

      &:disabled + .indicator {
        cursor: not-allowed;
        background: $color-neutral-positive-1;
        border-color: $color-neutral-positive-2;
      }
    }

    .indicator {
      box-sizing: content-box;
      width: rem(22px);
      height: rem(22px);
      display: inline-block;
      cursor: pointer;
      transition-duration: $base-transition-time;
      transition-property: background-color, border-color, color;
      background: $color-white;
      border: 2px solid $color-neutral-positive-1;
      border-radius: 50%;
      box-shadow: 0 0 16px $color-shadow-alpha-15;
      color: transparent;
      font-family: $font-sans;
      font-size: rem(16px);
      font-weight: 700;
      line-height: rem(22px);
      text-align: center;
    }
  }
</style>
