<div class="box">

    <div class="box-header">

        <div class="btn-group">
            <a class="btn btn-primary btn-sm <?php echo e($id, false); ?>-tree-tools" data-action="expand" title="<?php echo e(trans('admin.expand'), false); ?>">
                <i class="fa fa-plus-square-o"></i>&nbsp;<?php echo e(trans('admin.expand'), false); ?>

            </a>
            <a class="btn btn-primary btn-sm <?php echo e($id, false); ?>-tree-tools" data-action="collapse" title="<?php echo e(trans('admin.collapse'), false); ?>">
                <i class="fa fa-minus-square-o"></i>&nbsp;<?php echo e(trans('admin.collapse'), false); ?>

            </a>
        </div>

        <?php if($useSave): ?>
        <div class="btn-group">
            <a class="btn btn-info btn-sm <?php echo e($id, false); ?>-save" title="<?php echo e(trans('admin.save'), false); ?>"><i class="fa fa-save"></i><span class="hidden-xs">&nbsp;<?php echo e(trans('admin.save'), false); ?></span></a>
        </div>
        <?php endif; ?>

        <?php if($useRefresh): ?>
        <div class="btn-group">
            <a class="btn btn-warning btn-sm <?php echo e($id, false); ?>-refresh" title="<?php echo e(trans('admin.refresh'), false); ?>"><i class="fa fa-refresh"></i><span class="hidden-xs">&nbsp;<?php echo e(trans('admin.refresh'), false); ?></span></a>
        </div>
        <?php endif; ?>

        <div class="btn-group">
            <?php echo $tools; ?>

        </div>

        <?php if($useCreate): ?>
        <div class="btn-group pull-right">
            <a class="btn btn-success btn-sm" href="<?php echo e(url($path), false); ?>/create"><i class="fa fa-save"></i><span class="hidden-xs">&nbsp;<?php echo e(trans('admin.new'), false); ?></span></a>
        </div>
        <?php endif; ?>

    </div>
    <!-- /.box-header -->
    <div class="box-body table-responsive no-padding">
        <div class="dd" id="<?php echo e($id, false); ?>">
            <ol class="dd-list">
                <?php echo $__env->renderEach($branchView, $items, 'branch'); ?>
            </ol>
        </div>
    </div>
    <!-- /.box-body -->
</div>
<?php /**PATH /home/wwwroot/blogs_backend/resources/views/admin/tree.blade.php ENDPATH**/ ?>