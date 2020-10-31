

<?php if(!$isHoldSelectAllCheckbox): ?>
<div class="btn-group <?php echo e($selectAllName, false); ?>-btn" style="display:none;margin-right: 5px;">
    <a class="btn btn-sm btn-default hidden-xs"><span class="selected"></span></a>
    <button type="button" class="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown">
        <span class="caret"></span>
        <span class="sr-only">Toggle Dropdown</span>
    </button>
    <?php if(!$actions->isEmpty()): ?>
    <ul class="dropdown-menu" role="menu">
        <?php $__currentLoopData = $actions; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $action): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <?php if($action instanceof \Encore\Admin\Actions\BatchAction): ?>
                <li><?php echo $action->render(); ?></li>
            <?php else: ?>
                <li><a href="#" class="<?php echo e($action->getElementClass(false), false); ?>"><?php echo $action->render(); ?> </a></li>
            <?php endif; ?>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    </ul>
    <?php endif; ?>
</div>
<?php endif; ?><?php /**PATH /home/wwwroot/blogs_backend/resources/views/admin/grid/batch-actions.blade.php ENDPATH**/ ?>