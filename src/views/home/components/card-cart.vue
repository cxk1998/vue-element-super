<template>
  <div class="card-cart">
    <i class="fa fa-shopping-cart set-left" style="color: #34bfa3;font-size: 46px;line-height: 100px;margin-left: 20px;"></i>
    <div class="right">
      <p style="margin-top: 30px;color: rgba(0,0,0,.45);font-size: 16px;">Cart</p>
      <p style="margin-top: 5px;color: #666;font-size: 20px;">16,368</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "cart-cart"
  }
</script>

<style>
  .card-cart{
    margin: 15px;
    height: 100px;
    background-color: #fff;
    border-radius: 3px;
    cursor: pointer;
  }

  .card-cart .right{
    float: right;
    height: 100px;
    margin-right: 20px;
  }

</style>
