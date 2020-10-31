<?php $__env->startSection('content'); ?>
    <section class="content-header">
        <h1>
            <?php echo $header ?: trans('admin.title'); ?>

            <small><?php echo $description ?: trans('admin.description'); ?></small>
        </h1>

        <!-- breadcrumb start -->
        <?php if($breadcrumb): ?>
        <ol class="breadcrumb" style="margin-right: 30px;">
            <li><a href="<?php echo e(admin_url('/'), false); ?>"><i class="fa fa-dashboard"></i> <?php echo e(__('Home'), false); ?></a></li>
            <?php $__currentLoopData = $breadcrumb; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $item): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <?php if($loop->last): ?>
                    <li class="active">
                        <?php if(\Illuminate\Support\Arr::has($item, 'icon')): ?>
                            <i class="fa fa-<?php echo e($item['icon'], false); ?>"></i>
                        <?php endif; ?>
                        <?php echo e($item['text'], false); ?>

                    </li>
                <?php else: ?>
                <li>
                    <?php if(\Illuminate\Support\Arr::has($item, 'url')): ?>
                        <a href="<?php echo e(admin_url(\Illuminate\Support\Arr::get($item, 'url')), false); ?>">
                            <?php if(\Illuminate\Support\Arr::has($item, 'icon')): ?>
                                <i class="fa fa-<?php echo e($item['icon'], false); ?>"></i>
                            <?php endif; ?>
                            <?php echo e($item['text'], false); ?>

                        </a>
                    <?php else: ?>
                        <?php if(\Illuminate\Support\Arr::has($item, 'icon')): ?>
                            <i class="fa fa-<?php echo e($item['icon'], false); ?>"></i>
                        <?php endif; ?>
                        <?php echo e($item['text'], false); ?>

                    <?php endif; ?>
                </li>
                <?php endif; ?>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
        </ol>
        <?php elseif(config('admin.enable_default_breadcrumb')): ?>
        <ol class="breadcrumb" style="margin-right: 30px;">
            <li><a href="<?php echo e(admin_url('/'), false); ?>"><i class="fa fa-dashboard"></i> <?php echo e(__('Home'), false); ?></a></li>
            <?php for($i = 2; $i <= count(Request::segments()); $i++): ?>
                <li>
                <?php echo e(ucfirst(Request::segment($i)), false); ?>

                </li>
            <?php endfor; ?>
        </ol>
        <?php endif; ?>

        <!-- breadcrumb end -->

    </section>

    <section class="content">

        <?php echo $__env->make('admin::partials.alerts', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
        <?php echo $__env->make('admin::partials.exception', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
        <?php echo $__env->make('admin::partials.toastr', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>

        <?php if($_view_): ?>
            <?php echo $__env->make($_view_['view'], $_view_['data'], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
        <?php else: ?>
            <?php echo $_content_; ?>

        <?php endif; ?>

    </section>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('admin::index', ['header' => strip_tags($header)], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /home/wwwroot/blogs_backend/resources/views/admin/content.blade.php ENDPATH**/ ?>