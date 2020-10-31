<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title><?php echo e(config('admin.title'), false); ?> | <?php echo e(trans('admin.login'), false); ?></title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Bootstrap 3.3.5 -->
    <link rel="stylesheet" href="<?php echo e(admin_asset("vendor/laravel-admin/AdminLTE/bootstrap/css/bootstrap.min.css"), false); ?>">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="<?php echo e(admin_asset("vendor/laravel-admin/font-awesome/css/font-awesome.min.css"), false); ?>">
    <!-- Theme style -->
    <link rel="stylesheet" href="<?php echo e(admin_asset("vendor/laravel-admin/AdminLTE/dist/css/AdminLTE.min.css"), false); ?>">
    <!-- iCheck -->
    <link rel="stylesheet" href="<?php echo e(admin_asset("vendor/laravel-admin/AdminLTE/plugins/iCheck/square/blue.css"), false); ?>">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="//oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="//oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body class="hold-transition login-page" <?php if(config('admin.login_background_image')): ?>style="background: url(<?php echo e(config('admin.login_background_image'), false); ?>) no-repeat;background-size: cover;"<?php endif; ?>>
<div class="login-box">
    <div class="login-logo">
        <a href="<?php echo e(admin_base_path('/'), false); ?>"><b><?php echo e(config('admin.name'), false); ?></b></a>
    </div>
    <!-- /.login-logo -->
    <div class="login-box-body" <?php if(config('admin.background')): ?> style="background:rgba(255,255,255,0);"<?php endif; ?>>
        <p class="login-box-msg"><?php echo e(trans('admin.login'), false); ?></p>

        <form action="<?php echo e(admin_base_path('auth/login'), false); ?>" method="post">
            <div class="form-group has-feedback <?php echo !$errors->has('username') ?: 'has-error'; ?>">

                <?php if($errors->has('username')): ?>
                    <?php $__currentLoopData = $errors->get('username'); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $message): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <label class="control-label" for="inputError"><i class="fa fa-times-circle-o"></i><?php echo e($message, false); ?></label><br>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                <?php endif; ?>

                <input type="text" class="form-control" <?php if(config('admin.background')): ?> style="background:rgba(255,255,255,0);"<?php endif; ?> placeholder="<?php echo e(trans('admin.username'), false); ?>" name="username" value="<?php echo e(old('username'), false); ?>">
                <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
            </div>
            <div class="form-group has-feedback <?php echo !$errors->has('password') ?: 'has-error'; ?>">

                <?php if($errors->has('password')): ?>
                    <?php $__currentLoopData = $errors->get('password'); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $message): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <label class="control-label" for="inputError"><i class="fa fa-times-circle-o"></i><?php echo e($message, false); ?></label><br>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                <?php endif; ?>

                <input type="password" class="form-control" <?php if(config('admin.background')): ?> style="background:rgba(255,255,255,0);"<?php endif; ?> placeholder="<?php echo e(trans('admin.password'), false); ?>" name="password">
                <span class="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>
            <div class="row">
                <div class="form-group has-feedback <?php echo !$errors->has('captcha') ?: 'has-error'; ?>">

                    <?php if($errors->has('captcha')): ?>
                        <?php $__currentLoopData = $errors->get('captcha'); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $message): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                            <label class="control-label" for="inputError" style=" margin-left: 15px"><i class="fa fa-times-circle-o"></i><?php echo e($message, false); ?></label></br>
                        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                    <?php endif; ?>

                    <input type="text" class="form-control" style="display: inline;width: 35%; margin-left: 17px; <?php if(config('admin.background')): ?> background:rgba(255,255,255,0);<?php endif; ?>"  placeholder="<?php echo e(trans('admin.captcha'), false); ?>" name="captcha">
                    <div class="glyphicon form-control-feedback captcha"></div>
                    <img  class="captcha" src="<?php echo e(captcha_src('admin'), false); ?>" onclick="refresh()">
                    <div class="glyphicon refresh" style="width: 65px; text-align: center">换一张</div>
                </div>
                <script>
                    function refresh(){
                        $('img[class="captcha"]').attr('src','<?php echo e(captcha_src('admin'), false); ?>'+Math.random());
                    }
                </script>
            </div>
            <div class="row">
                <div class="col-xs-8">
                    <?php if(config('admin.auth.remember')): ?>
                        <div class="checkbox icheck">
                            <label>
                                <input type="checkbox" name="remember" value="1" <?php echo e((!old('username') || old('remember')) ? 'checked' : '', false); ?>>
                                <?php echo e(trans('admin.remember_me'), false); ?>

                            </label>
                        </div>
                    <?php endif; ?>
                </div>
                <!-- /.col -->
                <div class="col-xs-4">
                    <input type="hidden" name="_token" value="<?php echo e(csrf_token(), false); ?>">
                    <button type="submit" class="btn btn-primary btn-block btn-flat"><?php echo e(trans('admin.login'), false); ?></button>
                </div>
                <!-- /.col -->
            </div>
        </form>

    </div>
    <!-- /.login-box-body -->
</div>
<!-- /.login-box -->

<!-- jQuery 2.1.4 -->
<script src="<?php echo e(admin_asset("vendor/laravel-admin/AdminLTE/plugins/jQuery/jQuery-2.1.4.min.js"), false); ?> "></script>
<!-- Bootstrap 3.3.5 -->
<script src="<?php echo e(admin_asset("vendor/laravel-admin/AdminLTE/bootstrap/js/bootstrap.min.js"), false); ?>"></script>
<!-- iCheck -->
<script src="<?php echo e(admin_asset("vendor/laravel-admin/AdminLTE/plugins/iCheck/icheck.min.js"), false); ?>"></script>
<script>
    $(function () {
        $('input').iCheck({
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            increaseArea: '20%' // optional
        });
    });

    $('.refresh').click(function () {
        $('img[class="captcha"]').attr('src','<?php echo e(captcha_src('admin'), false); ?>'+Math.random());
    })
</script>
</body>
</html>
<?php /**PATH /home/wwwroot/blogs_backend/vendor/james.xue/login-captcha/src/../resources/views/index.blade.php ENDPATH**/ ?>