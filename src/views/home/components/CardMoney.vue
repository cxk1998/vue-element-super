<template>
  <div class="card-money">
    <i class="fa fa-dollar set-left" style="color: #F4516B;font-size: 46px;line-height: 100px;margin-left: 20px;"></i>
    <div class="right">
      <p style="margin-top: 30px;color: rgba(0,0,0,.45);font-size: 16px;">Shoppings</p>
      <p style="margin-top: 5px;color: #666;font-size: 20px;">16,368</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "cart-money"
  }
</script>

<style>
  .card-money{
    margin: 30px 30px 0 30px;
    height: 100px;
    background-color: #fff;
    border-radius: 3px;
  }

  .card-money .right{
    float: right;
    height: 100px;
    margin-right: 20px;
  }

</style>
