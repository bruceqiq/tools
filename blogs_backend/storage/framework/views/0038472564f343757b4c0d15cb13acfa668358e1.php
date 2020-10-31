<?php if($errors->hasBag('exception') && config('app.debug') == true): ?>
    <?php $error = $errors->getBag('exception');?>
    <div class="alert alert-warning alert-dismissable">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
        <h4>
            <i class="icon fa fa-warning"></i>
            <i style="border-bottom: 1px dotted #fff;cursor: pointer;" title="<?php echo e($error->first('type'), false); ?>" ondblclick="var f=this.innerHTML;this.innerHTML=this.title;this.title=f;"><?php echo e(class_basename($error->first('type')), false); ?></i>
            In <i title="<?php echo e($error->first('file'), false); ?> line <?php echo e($error->first('line'), false); ?>" style="border-bottom: 1px dotted #fff;cursor: pointer;" ondblclick="var f=this.innerHTML;this.innerHTML=this.title;this.title=f;"><?php echo e(basename($error->first('file')), false); ?> line <?php echo e($error->first('line'), false); ?></i> :
        </h4>
        <p><a style="cursor: pointer;" onclick="$('#laravel-admin-exception-trace').toggleClass('hidden');$('i', this).toggleClass('fa-angle-double-down fa-angle-double-up');"><i class="fa fa-angle-double-down"></i>&nbsp;&nbsp;<?php echo $error->first('message'); ?></a></p>

        <p class="hidden" id="laravel-admin-exception-trace"><br><?php echo nl2br($error->first('trace')); ?></p>
    </div>
<?php endif; ?>
<?php /**PATH /home/wwwroot/blogs_backend/resources/views/admin/partials/exception.blade.php ENDPATH**/ ?>